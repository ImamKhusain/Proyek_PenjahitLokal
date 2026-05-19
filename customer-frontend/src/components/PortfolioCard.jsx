import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";
import "./PortfolioCard.css"; // 💡 Import file CSS baru

const PortfolioCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/portfolios/tailor/${id}`);
        const actualData = response.data.data ? response.data.data : response.data;
        setPortfolios(Array.isArray(actualData) ? actualData : []);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data portfolio penjahit:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolios();
    }
  }, [id]);

  const openBookingModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 🚀 PERUBAHAN DI SINI: Menambahkan productDetail bawaan modal ke dalam destructuring parameter
  const handleBookingSubmit = async ({ bookingDate, finalNote, productDetail }) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu untuk membuat pesanan!");
        navigate("/login");
        return;
      }

      let customerId = null;
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );
        const decoded = JSON.parse(jsonPayload);
        customerId = decoded.id || decoded.userId || decoded.customer_id;
      } catch (err) {
        console.error("Gagal membaca token login:", err);
      }

      if (!customerId) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          customerId = parsedUser.id;
        }
      }

      if (!customerId) {
        alert("Sesi login tidak valid. Silakan login kembali.");
        navigate("/login");
        return;
      }

      // 🚀 PERUBAHAN DI SINI: Menyisipkan portfolio_id ke payload agar tidak masuk NULL ke database
      const payload = {
        customer_id: parseInt(customerId, 10), 
        tailor_id: parseInt(id, 10),
        booking_date: bookingDate,
        body_size_note: finalNote,
        portfolio_id: productDetail ? parseInt(productDetail.id, 10) : null // Ambil ID portofolio produk katalog
      };

      const response = await axios.post(
        "http://localhost:8080/api/bookings",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Booking pakaian berhasil diajukan!");
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error booking:", error);
      alert(error.response?.data?.message || "Gagal mengirim pengajuan booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="portfolio-loading">Memuat katalog eksklusif...</div>;
  }

  return (
    <div className="portfolio-page">
      <button onClick={() => navigate(`/detail/${id}`)} className="back-profile-btn">
        ← Kembali ke Profil Tailor
      </button>

      <div className="portfolio-header">
        <h1>KATALOG PAKAIAN</h1>
        <p>Daftar karya premium dan masterpice jahitan terbaik untuk Anda.</p>
      </div>

      {portfolios.length === 0 ? (
        <div className="portfolio-empty">
          <p>Belum ada produk katalog yang dipublikasikan.</p>
        </div>
      ) : (
        <div className="portfolio-grid">
          {portfolios.map((item) => {
            const hasImage = item.image_url && item.image_url !== "NULL" && item.image_url !== "";
            let imageSrc = "https://placehold.co/600x450?text=No+Image+Available";

            if (hasImage) {
              let fileName = item.image_url;
              if (fileName.includes("/")) {
                const parts = fileName.split("/");
                fileName = parts[parts.length - 1];
              }
              imageSrc = `http://localhost:8080/uploads/catalog/${fileName}`;
            }

            return (
              <div key={item.id} className="portfolio-card-item">
                <div className="card-image-wrap">
                  <img 
                    src={imageSrc} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x450?text=Gambar+Tidak+Tersedia";
                    }}
                  />
                  {item.size && <div className="card-size-badge">SIZE: {item.size}</div>}
                </div>
                
                <div className="card-content-body">
                  <h3>{item.name}</h3>
                  <p>{item.description || "Tidak ada deskripsi detail pengerjaan."}</p>
                  
                  <div className="card-content-footer">
                    <p className="card-price">Rp {parseInt(item.price || 0, 10).toLocaleString("id-ID")}</p>
                    <button onClick={() => openBookingModal(item)} className="booking-trigger-btn">
                      Booking Ini
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <BookingForm 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }}
        selectedProduct={selectedProduct}
        onSubmit={handleBookingSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PortfolioCard;