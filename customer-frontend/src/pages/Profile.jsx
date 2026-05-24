import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiUser, FiMail, FiShield, FiClock, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookingStats, setBookingStats] = useState({ accepted: 0, completed: 0 });
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const idUserAktif = user?.id || localStorage.getItem("id");
      const tokenAktif = user?.token || localStorage.getItem("token");

      if (!idUserAktif || !tokenAktif) {
        setFetchingData(false);
        return;
      }

      try {
        const cleanToken = tokenAktif.replace(/['"]+/g, '');
        const requestHeaders = {
          "Authorization": `Bearer ${cleanToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        };

        // Mengambil data secara paralel dari endpoint bookings dan payments
        const [bookingsResponse, paymentsResponse] = await Promise.all([
          axios({
            method: "get",
           url: "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/bookings",
            headers: requestHeaders
          }),
          axios({
            method: "get",
           url: "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/payments",
            headers: requestHeaders
          })
        ]);

        // --- 1. PROSES DATA BOOKINGS ---
        const allBookings = bookingsResponse.data?.data || [];
        const myBookings = allBookings.filter(
          (booking) => booking && Number(booking.customer_id) === Number(idUserAktif)
        );

        // --- 2. PROSES DATA PAYMENTS ---
        const allPayments = paymentsResponse.data?.data || [];
        
        // Filter riwayat pembayaran khusus milik customer yang sedang aktif
        // Join dilakukan dengan memeriksa apakah booking_id pada payment ada di dalam daftar booking milik user
        const myBookingIds = myBookings.map(b => b.id);
        const myPayments = allPayments.filter(
          (payment) => payment && myBookingIds.includes(payment.booking_id)
        );

        // --- 3. LOGIKA FILTER STATISTIK ---
        // Hitung total data pembayaran yang memiliki status "paid" dari endpoint payments
        const completedCount = myPayments.filter(p => {
          const statusPembayaran = p.payment_status ? p.payment_status.toLowerCase().trim() : "";
          return statusPembayaran === "paid";
        }).length;

        // Ambil ID pesanan yang sudah sukses dibayar agar tidak dihitung ganda
        const paidBookingIds = myPayments
          .filter(p => p.payment_status && p.payment_status.toLowerCase().trim() === "paid")
          .map(p => p.booking_id);

        // Pesanan Diproses: Berstatus 'accepted' atau 'acc' di tabel booking, TETAPI belum lunas dibayar
        const acceptedCount = myBookings.filter(b => {
          const statusBooking = b.status ? b.status.toLowerCase().trim() : "";
          const isAcceptedStatus = (statusBooking === "accepted" || statusBooking === "acc");
          const isNotPaidYet = !paidBookingIds.includes(b.id);
          
          return isAcceptedStatus && isNotPaidYet;
        }).length;

        setBookingStats({
          accepted: acceptedCount,
          completed: completedCount
        });
      } catch (error) {
        console.error("Gagal memuat statistik sinkronisasi dashboard profil:", error);
      } finally {
        setFetchingData(false);
      }
    };

    if (!loading) {
      fetchDashboardStats();
    }
  }, [user, loading]);

  const getInitialName = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <h3>Memuat Profil...</h3>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        
        {/* HEADER KARTU PROFIL */}
        <div className="profile-card-header">
          <div className="profile-avatar-large">
            {getInitialName()}
          </div>
          <h2>{user?.name?.toUpperCase() || "USER"}</h2>
          <p className="profile-tagline">Akun Pelanggan ARKI Tailor</p>
        </div>

        {/* AREA STATISTIK RINGKASAN PESANAN (REAL-TIME & SYNCED) */}
        <div className="profile-stats-container">
          <div className="stat-box accepted">
            <div className="stat-icon-wrapper">
              <FiClock size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-count">{fetchingData ? "..." : bookingStats.accepted}</span>
              <span className="stat-label">Diproses (Acc)</span>
            </div>
          </div>

          <div className="stat-box completed">
            <div className="stat-icon-wrapper">
              <FiCheckCircle size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-count">{fetchingData ? "..." : bookingStats.completed}</span>
              <span className="stat-label">Selesai Bayar</span>
            </div>
          </div>
        </div>

        {/* BODY KARTU PROFIL */}
        <div className="profile-card-body">
          <h3 className="section-title">Informasi Pribadi</h3>
          
          <div className="profile-info-row">
            <div className="info-icon-wrapper">
              <FiUser size={20} />
            </div>
            <div className="info-text-wrapper">
              <label>Nama Lengkap</label>
              <p>{user?.name || "Belum diatur"}</p>
            </div>
          </div>

          <div className="profile-info-row">
            <div className="info-icon-wrapper">
              <FiMail size={20} />
            </div>
            <div className="info-text-wrapper">
              <label>Alamat Email</label>
              <p>{user?.email || "Belum diatur"}</p> 
            </div>
          </div>

          <div className="profile-info-row">
            <div className="info-icon-wrapper">
              <FiShield size={20} />
            </div>
            <div className="info-text-wrapper">
              <label>Status Akun</label>
              <p className="status-badge">Verified Customer</p>
            </div>
          </div>
        </div>

        {/* FOOTER KARTU PROFIL */}
        <div className="profile-card-footer">
          <p>Bergabung bersama ARKI Tailor untuk layanan penjahit terbaik.</p>
        </div>

      </div>
    </div>
  );
};

export default Profile;