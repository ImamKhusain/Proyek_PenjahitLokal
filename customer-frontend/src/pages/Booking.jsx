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

  useEffect(() => {
    if (loading) return;

    // Jika proses memuat selesai dan data user benar-benar tidak ada, arahkan ke home
    if (!user && !localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    
    fetchMyBookings();
  }, [user, loading]);

  const fetchMyBookings = async () => {
    try {
      const tokenAktif = user?.token || localStorage.getItem("token");
      const idUserAktif = user?.id || localStorage.getItem("id");

      if (!tokenAktif) {
        setErrorFetch(true);
        return;
      }

      // Bersihkan token dari kemungkinan sisa-sisa karakter kutip ganda akibat stringify
      const cleanToken = tokenAktif.replace(/['"]+/g, '');

      // 🚀 SOLUSI CORS & 403: Konfigurasi request axios dengan header eksplisit
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/bookings",
        headers: {
          "Authorization": `Bearer ${cleanToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      // Mengambil data array utama sesuai struktur response.data.data dari bookingController
      const allBookings = response.data?.data || [];
      
      // FILTER DATA: Pastikan customer hanya melihat pesanan miliknya sendiri
      const myBookings = allBookings.filter(
        (booking) => booking && Number(booking.customer_id) === Number(idUserAktif)
      );

      // Urutkan data berdasarkan pesanan terbaru (ID terbesar di atas)
      myBookings.sort((a, b) => b.id - a.id);
      
      setPesananList(myBookings);
      setErrorFetch(false);
    } catch (error) {
      console.error("Gagal memuat data booking dari database:", error);
      setErrorFetch(true);
    }
  };

  // Mengubah tanggal string database menjadi format lokal Indonesia
  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    const opsi = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", opsi);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "150px", fontFamily: "sans-serif" }}>
        <h3>Memuat Data Pesanan...</h3>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <div className="booking-content-wrapper">
        
        {/* HEADER HALAMAN */}
        <div className="booking-header">
          <h1>Pesanan Saya</h1>
          <p>Pantau proses pengerjaan busana Anda oleh mitra penjahit kami secara real-time</p>
        </div>

        {/* NOTIFIKASI ERROR JIKA KONEKSI TERBLOKIR CORS / PORT SALAH */}
        {errorFetch && (
          <div className="booking-error-message">
            Gagal mengambil data dari server. Sesi login Anda tidak valid atau ditolak oleh gerbang keamanan sistem (Error 403/401).
          </div>
        )}

        {/* DAFTAR KARTU PESANAN */}
        <div className="booking-list">
          {pesananList.length > 0 ? (
            pesananList.map((pesanan) => (
              <div key={pesanan.id} className="booking-card">
                
                {/* Bagian Informasi Kiri */}
                <div className="booking-details">
                  {/* Membaca as: "tailor" dari include bookingController */}
                  <h3>{pesanan.tailor?.name || "Mitra Penjahit ARKI"}</h3>
                  
                  <p>Catatan Ukuran & Model Pakaian:</p>
                  <div className="note-text-box">
                    {pesanan.body_size_note || "Tidak ada catatan ukuran"}
                  </div>

                  <p style={{ marginTop: "14px" }}>
                    Tanggal Rencana Pertemuan: <strong>{formatTanggal(pesanan.booking_date)}</strong>
                  </p>
                  <p>Kode Booking: <span className="booking-id-tag">ARKI-{pesanan.id}</span></p>
                </div>

                {/* Bagian Status Kanan */}
                <div>
                  <span className={`status-badge ${pesanan.status || "pending"}`}>
                    {pesanan.status || "pending"}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className="booking-empty">
              <p>Belum ada riwayat pengerjaan pakaian saat ini.</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER WARNA KUNING PASTEL KHAS NAVBAR */}
      <div className="booking-footer">
        Author Kelompok 5 <br /> @ 2026
      </div>
    </div>
  );
};

export default Booking;