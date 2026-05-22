import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import "./Booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [pesananList, setPesananList] = useState([]);
  // 💡 TAMBAHAN: State untuk menyimpan daftar booking_id yang sudah lunas dibayar
  const [paidBookingIds, setPaidBookingIds] = useState([]);
  const [errorFetch, setErrorFetch] = useState(false);

  // State untuk menyimpan tanggal baru pilihan user berdasarkan ID booking
  const [selectedNewDates, setSelectedNewDates] = useState({});
  // State indikator loading saat proses update/delete sedang dikirim ke backend
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user && !localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    fetchMyBookingsAndPayments();
  }, [user, loading]);

  // ==========================================
  // 1. AMBIL DATA PESANAN & STATUS FINANSIAL (FORK-JOIN)
  // ==========================================
  const fetchMyBookingsAndPayments = async () => {
    try {
      const tokenAktif = user?.token || localStorage.getItem("token");
      const idUserAktif = user?.id || localStorage.getItem("id");

      if (!tokenAktif) {
        setErrorFetch(true);
        return;
      }

      const cleanToken = tokenAktif.replace(/['"]+/g, '');
      const requestHeaders = {
        "Authorization": `Bearer ${cleanToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

      // 💡 PERBAIKAN: Memanggil endpoint bookings dan payments secara paralel
      const [bookingsResponse, paymentsResponse] = await Promise.all([
        axios({
          method: "get",
          url: "http://localhost:8080/api/bookings",
          headers: requestHeaders
        }),
        axios({
          method: "get",
          url: "http://localhost:8080/api/payments",
          headers: requestHeaders
        })
      ]);
      
      // Proses data booking
      const allBookings = bookingsResponse.data?.data || [];
      const myBookings = allBookings.filter(
        (booking) => booking && Number(booking.customer_id) === Number(idUserAktif)
      );
      myBookings.sort((a, b) => b.id - a.id);

      // Proses data payment untuk mendapatkan ID booking yang berstatus "paid"
      const allPayments = paymentsResponse.data?.data || [];
      const confirmedPaidIds = allPayments
        .filter(p => p && p.payment_status && p.payment_status.toLowerCase().trim() === "paid")
        .map(p => p.booking_id);
      
      setPesananList(myBookings);
      setPaidBookingIds(confirmedPaidIds); // Simpan semua ID booking yang sudah lunas
      setErrorFetch(false);
    } catch (error) {
      console.error("Gagal memuat data gabungan booking dan payment:", error);
      setErrorFetch(true);
    }
  };

  // ==========================================
  // 2. AJUKAN TANGGAL BARU (PUT)
  // ==========================================
  const handleRescheduleBooking = async (bookingId, currentBookingData) => {
    const newDate = selectedNewDates[bookingId];
    if (!newDate) {
      toast.dismiss();
      toast.error("Silakan pilih tanggal rencana pertemuan yang baru terlebih dahulu.");
      return;
    }

    try {
      setIsUpdating(true);
      const tokenAktif = user?.token || localStorage.getItem("token");
      const cleanToken = tokenAktif.replace(/['"]+/g, '');

      await axios({
        method: "put",
        url: `http://localhost:8080/api/bookings/${bookingId}`,
        headers: {
          "Authorization": `Bearer ${cleanToken}`,
          "Content-Type": "application/json"
        },
        data: {
          booking_date: newDate,
          status: "pending", 
          body_size_note: currentBookingData.body_size_note 
        }
      });

      toast.dismiss();
      toast.success("Pengajuan jadwal ulang berhasil dikirim!");
      
      setSelectedNewDates(prev => {
        const copy = { ...prev };
        delete copy[bookingId];
        return copy;
      });

      await fetchMyBookingsAndPayments();
    } catch (error) {
      console.error("Gagal melakukan pembaruan jadwal booking:", error);
      toast.dismiss();
      toast.error("Gagal mengirimkan jadwal ulang. Silakan coba lagi nanti.");
    } finally {
      setIsUpdating(false);
    }
  };

  // ==========================================
  // 3. HAPUS PERMANEN DARI DATABASE (DELETE)
  // ==========================================
  const executeDelete = async (bookingId) => {
    try {
      setIsUpdating(true);
      const tokenAktif = user?.token || localStorage.getItem("token");
      const cleanToken = tokenAktif.replace(/['"]+/g, '');

      await axios({
        method: "delete",
        url: `http://localhost:8080/api/bookings/${bookingId}`,
        headers: {
          "Authorization": `Bearer ${cleanToken}`,
          "Content-Type": "application/json"
        }
      });

      toast.dismiss();
      toast.success("Pesanan berhasil dihapus secara permanen.");
      await fetchMyBookingsAndPayments();
    } catch (error) {
      console.error("Gagal menghapus booking dari database:", error);
      toast.dismiss();
      toast.error("Gagal menghapus pesanan dari database.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteBooking = (bookingId) => {
    toast.dismiss();
    toast((t) => (
      <div style={{ textAlign: 'center', padding: '4px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: '500' }}>
          Apakah Anda yakin ingin menghapus pesanan ini secara permanen?
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              executeDelete(bookingId);
            }}
            style={{
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Hapus
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: '#e2e8f0',
              color: '#334155',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Batal
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
    });
  };

  // ==========================================
  // 4. ARAHKAN KE HALAMAN CHECKOUT / PEMBAYARAN
  // ==========================================
  const handlePaymentRedirect = (pesanan) => {
    navigate(
      `/pembayaran/${pesanan.id}`,
      {
        state: {
          booking: pesanan,
        },
      }
    );
  };

  const handleDateChange = (bookingId, value) => {
    setSelectedNewDates(prev => ({
      ...prev,
      [bookingId]: value
    }));
  };

  const formatRupiah = (angka) => {
    if (angka === undefined || angka === null || isNaN(angka)) return "Belum ditentukan";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(angka);
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    const opsi = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", opsi);
  };

  const renderFormattedNote = (noteText) => {
    if (!noteText) return <p className="empty-note">Tidak ada catatan ukuran</p>;
    
    return noteText.split('\n').map((line, index) => {
      if (!line.trim()) return null;
      if (line.includes("Catatan Ukuran & Model Pakaian:") || line.includes("DETAIL UKURAN BADAN:")) {
        return <h4 key={index} className="note-category-title">{line}</h4>;
      }
      return <p key={index} className="note-line-item">{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="booking-loading-screen">
        <div className="spinner"></div>
        <h3>Memuat Data Pesanan ARKI...</h3>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <div className="booking-content-wrapper">
        
        <div className="booking-header">
          <h1>Pesanan Saya</h1>
          <p>Pantau proses pengerjaan busana Anda oleh mitra penjahit kami secara real-time</p>
        </div>

        {errorFetch && (
          <div className="booking-error-message">
            <span className="error-icon">⚠️</span>
            <p>Gagal mengambil data dari server. Sesi login Anda tidak valid atau ditolak oleh sistem.</p>
          </div>
        )}

        <div className="booking-list">
          {pesananList.length > 0 ? (
            pesananList.map((pesanan) => {
              const rawStatus = pesanan.status || "pending";
              const currentStatusClean = rawStatus.toLowerCase().trim();

              const isCanceled = currentStatusClean === "cancelled";
              const isAccepted = currentStatusClean === "accepted";
              const isCompleted = currentStatusClean === "completed";
              
              // 💡 KUNCI UTAMA: Cek apakah ID booking ini ada di dalam array paidBookingIds
              const isAlreadyPaid = paidBookingIds.includes(pesanan.id);

              let statusLabel = "Menunggu";
              if (isAccepted) statusLabel = isAlreadyPaid ? "Lunas" : "Diterima";
              if (isCompleted || (isAccepted && isAlreadyPaid)) statusLabel = "Selesai"; 
              if (isCanceled) statusLabel = "Dibatalkan";

              // Penentuan class style berdasarkan status bayar / status booking
              const badgeClass = isCanceled ? "badge-canceled" : (isCompleted || isAlreadyPaid) ? "badge-completed" : isAccepted ? "badge-accepted" : "badge-pending";
              const borderClass = isCanceled ? "status-border-canceled" : (isCompleted || isAlreadyPaid) ? "status-border-completed" : isAccepted ? "status-border-accepted" : "status-border-pending";

              return (
                <div key={pesanan.id} className={`booking-card ${borderClass}`}>
                  
                  <div className="booking-card-main">
                    <div className="booking-details">
                      <div className="booking-card-header">
                        <h3>{pesanan.tailor?.name || "Mitra Penjahit ARKI"}</h3>
                        <span className="booking-id-tag">ARKI-{pesanan.id}</span>
                      </div>
                      
                      <div className="note-text-box-premium">
                        {renderFormattedNote(pesanan.body_size_note)}
                      </div>

                      <div className="booking-price-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0 6px 0' }}>
                        <span className="price-icon" style={{ fontSize: '1.2rem' }}>💰</span>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#4b5563' }}>
                          Harga Model: <strong style={{ color: '#dc2626', fontSize: '1.1rem' }}>
                            {pesanan.portfolio ? formatRupiah(pesanan.portfolio.price) : "Custom / Hubungi Penjahit"}
                          </strong>
                        </p>
                      </div>

                      <div className="booking-time-info" style={{ marginBottom: (isAccepted && !isAlreadyPaid) ? '4px' : '12px' }}>
                        <span className="calendar-icon">📅</span>
                        <p>
                          Rencana Pertemuan: <strong>{formatTanggal(pesanan.booking_date)}</strong>
                        </p>
                      </div>

                      {/* 💡 KONDISIONAL TOMBOL: Jika di-acc DAN belum dibayar, tampilkan tombol bayar */}
                      {isAccepted && !isAlreadyPaid && (
                        <div className="payment-action-box" style={{ margin: '16px 0 8px 0' }}>
                          <button
                            onClick={() => handlePaymentRedirect(pesanan)}
                            style={{
                              backgroundColor: '#10b981',
                              color: '#ffffff',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '6px',
                              fontWeight: '600',
                              fontSize: '0.95rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
                              transition: 'all 0.2s ease-in-out'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                          >
                            💳 Lanjut Ke Pembayaran
                          </button>
                        </div>
                      )}

                      {/* 💡 KONDISIONAL INFORMASI: Jika sudah sukses dibayar, tampilkan informasi Lunas */}
                      {isAccepted && isAlreadyPaid && (
                        <div className="payment-success-info-box" style={{ 
                          margin: '16px 0 8px 0', 
                          background: '#f0fdf4', 
                          border: '1px solid #bbf7d0', 
                          padding: '10px 14px', 
                          borderRadius: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#16a34a',
                          fontWeight: '500',
                          fontSize: '0.9rem'
                        }}>
                          <span>✅ Pembayaran Terverifikasi (Lunas). Menunggu Pengerjaan Busana.</span>
                        </div>
                      )}

                    </div>

                    <div className="booking-status-wrapper">
                      <span className={`status-badge-premium ${badgeClass}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {isCanceled && (
                    <div className="booking-action-bar">
                      <div className="action-message">
                        <span className="info-dot"></span>
                        <div>
                          <strong>Pesanan Dibatalkan.</strong> Ajukan tanggal pertemuan baru atau singkirkan riwayat untuk menghapusnya.
                        </div>
                      </div>
                      
                      <div className="reschedule-form-container">
                        <div className="input-date-wrapper">
                          <label htmlFor={`new-date-${pesanan.id}`}>Pilih Tanggal Baru:</label>
                          <input 
                            type="date" 
                            id={`new-date-${pesanan.id}`}
                            className="form-input-date"
                            value={selectedNewDates[pesanan.id] || ""}
                            onChange={(e) => handleDateChange(pesanan.id, e.target.value)}
                            disabled={isUpdating}
                          />
                        </div>

                        <div className="action-buttons-group">
                          <button 
                            className="btn-action-secondary"
                            onClick={() => handleDeleteBooking(pesanan.id)}
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Menghapus..." : "Singkirkan"}
                          </button>
                          <button 
                            className="btn-action-primary"
                            onClick={() => handleRescheduleBooking(pesanan.id, pesanan)}
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Memproses..." : "Ajukan Tanggal Baru"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="booking-empty-state">
              <div className="empty-box-icon">📋</div>
              <h3>Belum Ada Riwayat Pesanan</h3>
              <p>Anda belum memiliki riwayat pengerjaan atau pemesanan pakaian saat ini.</p>
              <button onClick={() => navigate("/layanan")} className="btn-order-now">
                Pesan Penjahit Sekarang
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="booking-footer">
        Author Kelompok 5 <br /> 
        <span>© 2026 ARKI Tailor Platform</span>
      </div>
    </div>
  );
};

export default Booking;