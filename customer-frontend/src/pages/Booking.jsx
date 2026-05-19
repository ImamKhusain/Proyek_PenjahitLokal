import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [pesananList, setPesananList] = useState([]);
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

    fetchMyBookings();
  }, [user, loading]);

  // ==========================================
  // 1. AMBIL DATA PESANAN (GET BOOKINGS VIA SEQUELIZE JOIN)
  // ==========================================
  const fetchMyBookings = async () => {
    try {
      const tokenAktif = user?.token || localStorage.getItem("token");
      const idUserAktif = user?.id || localStorage.getItem("id");

      if (!tokenAktif) {
        setErrorFetch(true);
        return;
      }

      const cleanToken = tokenAktif.replace(/['"]+/g, '');

      // Menuju ke endpoint getAllBookings kelompokmu yang sudah di-include Portfolio
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/bookings",
        headers: {
          "Authorization": `Bearer ${cleanToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      const allBookings = response.data?.data || [];
      
      // Filter agar hanya menampilkan booking kepunyaan user yang sedang login
      const myBookings = allBookings.filter(
        (booking) => booking && Number(booking.customer_id) === Number(idUserAktif)
      );

      // Urutkan berdasarkan ID terbesar (Terbaru)
      myBookings.sort((a, b) => b.id - a.id);
      
      setPesananList(myBookings);
      setErrorFetch(false);
    } catch (error) {
      console.error("Gagal memuat data booking dari database:", error);
      setErrorFetch(true);
    }
  };

  // ==========================================
  // 2. AJUKAN TANGGAL BARU (PUT)
  // ==========================================
  const handleRescheduleBooking = async (bookingId, currentBookingData) => {
    const newDate = selectedNewDates[bookingId];
    if (!newDate) {
      alert("Silakan pilih tanggal rencana pertemuan yang baru terlebih dahulu.");
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
          status: "pending", // Kembalikan ke status pending default kelompokmu
          body_size_note: currentBookingData.body_size_note 
        }
      });

      alert("Pengajuan jadwal ulang berhasil dikirim! Status pesanan kembali Menunggu konfirmasi.");
      
      setSelectedNewDates(prev => {
        const copy = { ...prev };
        delete copy[bookingId];
        return copy;
      });

      await fetchMyBookings();
    } catch (error) {
      console.error("Gagal melakukan pembaruan jadwal booking:", error);
      alert("Gagal mengirimkan jadwal ulang. Silakan coba lagi nanti.");
    } finally {
      setIsUpdating(false);
    }
  };

  // ==========================================
  // 3. HAPUS PERMANEN DARI DATABASE (DELETE)
  // ==========================================
  const handleDeleteBooking = async (bookingId) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menyingkirkan pesanan ini? Tindakan ini akan menghapusnya secara permanen dari database."
    );
    if (!konfirmasi) return;

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

      alert("Pesanan berhasil dihapus secara permanen dari database.");
      await fetchMyBookings();
    } catch (error) {
      console.error("Gagal menghapus booking dari database:", error);
      alert("Gagal menghapus pesanan dari database.");
    } finally {
      setIsUpdating(false);
    }
  };

  // ==========================================
// 4. ARAHKAN KE HALAMAN CHECKOUT / PEMBAYARAN
// ==========================================
const handlePaymentRedirect = (bookingId) => {
  // SEBELUMNYA: navigate(`/payment/${bookingId}`);
  // UBAH MENJADI:
  navigate(`/pembayaran/${bookingId}`);
};

  const handleDateChange = (bookingId, value) => {
    setSelectedNewDates(prev => ({
      ...prev,
      [bookingId]: value
    }));
  };

  // Helper format Rupiah
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

              let statusLabel = "Menunggu";
              if (isAccepted) statusLabel = "Diterima";
              if (isCompleted) statusLabel = "Selesai";
              if (isCanceled) statusLabel = "Dibatalkan";

              const badgeClass = isCanceled ? "badge-canceled" : isAccepted ? "badge-accepted" : isCompleted ? "badge-completed" : "badge-pending";
              const borderClass = isCanceled ? "status-border-canceled" : isAccepted ? "status-border-accepted" : isCompleted ? "status-border-completed" : "status-border-pending";

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

                      {/* 💰 NOMINAL HARGA ASLI BERDASARKAN DATABASE PORTOFOLIO */}
                      <div className="booking-price-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0 6px 0' }}>
                        <span className="price-icon" style={{ fontSize: '1.2rem' }}>💰</span>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#4b5563' }}>
                          Harga Model: <strong style={{ color: '#dc2626', fontSize: '1.1rem' }}>
                            {pesanan.portfolio ? formatRupiah(pesanan.portfolio.price) : "Custom / Hubungi Penjahit"}
                          </strong>
                        </p>
                      </div>

                      <div className="booking-time-info" style={{ marginBottom: isAccepted ? '4px' : '12px' }}>
                        <span className="calendar-icon">📅</span>
                        <p>
                          Rencana Pertemuan: <strong>{formatTanggal(pesanan.booking_date)}</strong>
                        </p>
                      </div>

                      {/* 💳 BLOK TOMBOL PEMBAYARAN KHUSUS UNTUK STATUS DITERIMA (ACCEPTED) */}
                      {isAccepted && (
                        <div className="payment-action-box" style={{ margin: '16px 0 8px 0' }}>
                          <button
                            onClick={() => handlePaymentRedirect(pesanan.id)}
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