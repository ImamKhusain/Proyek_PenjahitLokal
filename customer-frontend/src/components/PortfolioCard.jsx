import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BookingForm from "./BookingForm";
import "./PortfolioCard.css";

const PortfolioCard = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // =====================================
  // FETCH PORTFOLIOS
  // =====================================

  useEffect(() => {

    const fetchPortfolios =
      async () => {

        try {

          const response = await axios.get(
            `https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/portfolios/tailor/${id}`
          );

          const actualData =
            response.data.data
              ? response.data.data
              : response.data;

          setPortfolios(
            Array.isArray(actualData)
              ? actualData
              : []
          );

          setLoading(false);

        } catch (error) {

          console.error(
            "Gagal mengambil data portfolio penjahit:",
            error
          );

          setLoading(false);

        }

      };

    if (id) {
      fetchPortfolios();
    }

  }, [id]);


  // =====================================
  // OPEN BOOKING MODAL
  // =====================================

  const openBookingModal =
    (product) => {

      setSelectedProduct(product);
      setIsModalOpen(true);

    };


  // =====================================
  // HANDLE BOOKING
  // =====================================

  const handleBookingSubmit =
    async ({
      booking_date, // Menerima key booking_date dari BookingForm
      finalNote,
      productDetail,
    }) => {

      setIsSubmitting(true);

      try {

        const token = localStorage.getItem("token");

        // =====================================
        // VALIDASI LOGIN
        // =====================================

        if (!token) {

          toast.dismiss();
          toast.error(
            "Anda harus login terlebih dahulu untuk membuat pesanan!"
          );

          navigate("/login");
          return;

        }

        let customerId = null;

        try {

          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );

          const decoded = JSON.parse(jsonPayload);

          customerId =
            decoded.id ||
            decoded.userId ||
            decoded.customer_id;

        } catch (err) {

          console.error(
            "Gagal membaca token login:",
            err
          );

        }

        // =====================================
        // FALLBACK USER
        // =====================================

        if (!customerId) {

          const storedUser = localStorage.getItem("user");

          if (storedUser) {

            const parsedUser = JSON.parse(storedUser);
            customerId = parsedUser.id;

          }

        }

        // =====================================
        // VALIDASI CUSTOMER
        // =====================================

        if (!customerId) {

          toast.dismiss();
          toast.error(
            "Sesi login tidak valid. Silakan login kembali."
          );

          navigate("/login");
          return;

        }

        // =====================================
        // PAYLOAD (SESUAI NOTASI DATABASE)
        // =====================================

        const payload = {
          customer_id: parseInt(customerId, 10),
          tailor_id: parseInt(id, 10),
          booking_date: booking_date, // Cocok dengan nama kolom phpMyAdmin kamu
          body_size_note: finalNote,
          portfolio_id: productDetail ? parseInt(productDetail.id, 10) : null,
        };

        // =====================================
        // API BOOKING
        // =====================================

        const response = await axios.post(
          "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/bookings",
          payload,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        // 1. Tutup modal secara aman terlebih dahulu
        setIsModalOpen(false);
        setSelectedProduct(null);

        // 2. Munculkan toast sukses di level parent agar tidak hilang saat modal unmount
        toast.dismiss();
        toast.success(
          response.data.message || "Booking pakaian berhasil diajukan!",
          {
            duration: 4000,
            icon: '🎉'
          }
        );

      } catch (error) {

        console.error(
          "Error booking:",
          error
        );

        toast.dismiss();
        toast.error(
          error.response?.data?.message ||
          "Gagal mengirim pengajuan booking."
        );

      } finally {

        setIsSubmitting(false);

      }

    };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="portfolio-loading">
        Memuat katalog eksklusif...
      </div>
    );

  }


  // =====================================
  // RENDER
  // =====================================

  return (

    <div className="portfolio-page">

      <button
        onClick={() => navigate(`/detail/${id}`)}
        className="back-profile-btn"
      >
        ← Kembali ke Profil Tailor
      </button>

      <div className="portfolio-header">
        <h1>KATALOG PAKAIAN</h1>
        <p>
          Daftar karya premium dan masterpice jahitan terbaik untuk Anda.
        </p>
      </div>

      {portfolios.length === 0 ? (

        <div className="portfolio-empty">
          <p>Belum ada produk katalog yang dipublikasikan.</p>
        </div>

      ) : (

        <div className="portfolio-grid">

          {portfolios.map((item) => {

            // =====================================
            // FIREBASE IMAGE URL
            // =====================================

            const hasImage =
              item.image_url &&
              item.image_url !== "NULL" &&
              item.image_url !== "";

            const imageSrc =
              hasImage
                ? item.image_url
                : "https://placehold.co/600x450?text=No+Image+Available";


            return (

              <div
                key={item.id}
                className="portfolio-card-item"
              >

                {/* IMAGE */}

                <div className="card-image-wrap">

                  <img
                    src={imageSrc}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x450?text=Gambar+Tidak+Tersedia";
                    }}
                  />

                  {item.size && (
                    <div className="card-size-badge">
                      SIZE: {item.size}
                    </div>
                  )}

                </div>

                {/* CONTENT */}

                <div className="card-content-body">

                  <h3>{item.name}</h3>

                  <p>
                    {item.description || "Tidak ada deskripsi detail pengerjaan."}
                  </p>

                  <div className="card-content-footer">

                    <p className="card-price">
                      Rp {
                        parseInt(item.price || 0, 10).toLocaleString("id-ID")
                      }
                    </p>

                    <button
                      onClick={() => openBookingModal(item)}
                      className="booking-trigger-btn"
                    >
                      Booking Ini
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {/* MODAL */}

      <BookingForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        selectedProduct={selectedProduct}
        onSubmit={handleBookingSubmit}
        isSubmitting={isSubmitting}
      />

    </div>

  );

};

export default PortfolioCard;