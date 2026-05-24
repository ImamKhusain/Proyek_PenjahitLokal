import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  AuthContext,
} from "../context/AuthContext";

import "./TailorDetail.css";

const TailorDetail = () => {

  // =====================================
  // AUTH USER
  // =====================================

  const {
    user,
  } = useContext(
    AuthContext
  );

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [tailor, setTailor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // RATING
  // =====================================

  const [ratings, setRatings] =
    useState([]);

  const [ratingValue, setRatingValue] =
    useState(5);

  const [review, setReview] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // =====================================
  // SHOW / HIDE
  // =====================================

  const [showRatingForm, setShowRatingForm] =
    useState(false);

  const [showReviews, setShowReviews] =
    useState(false);


  // =====================================
  // FETCH DETAIL TAILOR
  // =====================================

  useEffect(() => {

    fetchTailorDetail();

    fetchRatings();

  }, [id]);


  // =====================================
  // FETCH DETAIL
  // =====================================

  const fetchTailorDetail =
    async () => {

      try {

        const response =
          await axios.get(

            `https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/tailors/${id}`

          );

        const actualData =

          response.data.data

            ? response.data.data

            : response.data;

        setTailor(actualData);

        setLoading(false);

      } catch (error) {

        console.log(
          "Error mengambil detail penjahit:",
          error
        );

        setLoading(false);

      }

    };


  // =====================================
  // FETCH RATINGS
  // =====================================

  const fetchRatings =
    async () => {

      try {

        const response =
          await axios.get(

            `https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/ratings/tailor/${id}`

          );

        const actualData =

          response.data.data

            ? response.data.data

            : response.data;

        setRatings(actualData);

      } catch (error) {

        console.log(error);

      }

    };


  // =====================================
  // SUBMIT RATING
  // =====================================

  const handleSubmitRating =
    async () => {

      try {

        setIsSubmitting(true);

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/ratings",

          {

            tailor_id:
              Number(id),

            rating:
              Number(
                ratingValue
              ),

            review,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        // RESET FORM

        setReview("");

        setRatingValue(5);

        // REFRESH RATINGS

        fetchRatings();

        // CLOSE FORM

        setShowRatingForm(false);

        // SUCCESS TOAST

        toast.success(
          "Review berhasil dikirim"
        );

      } catch (error) {

        console.log(error);

        // =====================================
        // ERROR TOAST
        // =====================================

        if (

          error.response &&

          error.response.data &&

          error.response.data.message

        ) {

          toast.error(
            error.response.data.message
          );

        } else {

          toast.error(
            "Gagal memberi review"
          );

        }

      } finally {

        setIsSubmitting(false);

      }

    };


  // =====================================
  // HANDLE CHAT
  // =====================================

  const handleChat =
    () => {

      const roomId =
        `room_${user.id}_${tailor.id}`;

      navigate(

        `/chat/${roomId}`,

        {

          state: {
            tailor,
          },

        }

      );

    };


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="tailor-detail-state">

        Memuat detail penjahit...

      </div>

    );

  }


  // =====================================
  // NOT FOUND
  // =====================================

  if (!tailor) {

    return (

      <div className="tailor-detail-state">

        Data penjahit tidak ditemukan.

      </div>

    );

  }


  // =====================================
  // FIREBASE IMAGE
  // =====================================

  const hasPhoto =

    tailor.photo &&

    tailor.photo !== "NULL" &&

    tailor.photo !== "";

  const imageUrl =

    hasPhoto

      ? tailor.photo

      : "https://placehold.co/500x500?text=No+Photo";


  // =====================================
  // AVERAGE RATING
  // =====================================

  const averageRating =

    ratings.length > 0

      ? (

          ratings.reduce(

            (acc, item) =>

              acc + Number(item.rating),

            0

          ) / ratings.length

        ).toFixed(1)

      : "0.0";


  // =====================================
  // RENDER
  // =====================================

  return (

    <div className="tailor-detail-page">

      {/* TOASTER */}

      <Toaster

        position="top-center"

        toastOptions={{

          style: {

            background: "#111827",

            color: "#ffffff",

            borderRadius: "12px",

            padding: "14px 18px",

            fontSize: "14px",

            fontWeight: "500",

          },

          success: {

            style: {

              background: "#16a34a",

            },

          },

          error: {

            style: {

              background: "#dc2626",

            },

          },

        }}
      />


      {/* BACK */}

      <button

        onClick={() =>
          navigate("/home")
        }

        className="back-to-list-btn"
      >
        ← Kembali ke Daftar
      </button>


      {/* GRID */}

      <div className="detail-layout-grid">

        {/* FOTO */}

        <div className="detail-photo-column">

          <img

            src={imageUrl}

            alt={tailor.name}

            className="detail-main-img"

            onError={(e) => {

              e.target.onerror =
                null;

              e.target.src =
                "https://placehold.co/500x500?text=No+Photo";

            }}

          />

        </div>


        {/* INFO */}

        <div className="detail-info-column">

          {/* NAMA */}

          <h1 className="detail-vendor-name">

            {tailor.name}

          </h1>


          {/* RATING */}

          <div className="detail-rating-row">

            <span className="detail-star-icon">
              ⭐
            </span>

            <span>
              {averageRating}
            </span>

            <span className="detail-order-count">

              • {ratings.length} Review

            </span>

          </div>


          {/* ACTION */}

          <div className="detail-actions-row">

            {/* BUTTON RATING */}

            <button

              onClick={() =>

                setShowRatingForm(
                  !showRatingForm
                )

              }

              className={

                showRatingForm

                  ? "action-fav-btn active-rating-btn"

                  : "action-fav-btn"

              }
            >
              ⭐
            </button>

            {/* CHAT */}

            <button

              onClick={handleChat}

              className="action-chat-btn"
            >
              💬 Chat
            </button>

            {/* KATALOG */}

            <button

              onClick={() =>

                navigate(
                  `/portfolio-katalog/${tailor.id}`
                )

              }

              className="action-catalog-btn"
            >
              Katalog
            </button>

          </div>


          <hr className="detail-divider-line" />


          {/* DESKRIPSI */}

          <div>

            <h3 className="detail-section-title">

              Produk Detail & Profil

            </h3>

            <p className="detail-description-text">

              {tailor.description ||

                "Belum ada deskripsi profil dari penjahit ini."}

            </p>

          </div>


          {/* INFO */}

          <div className="detail-database-box">

            <p>

              <strong>
                ✨ Spesialisasi Jahit:
              </strong>{" "}

              {tailor.specialization || "-"}

            </p>

            <p>

              <strong>
                📍 Alamat Workshop:
              </strong>{" "}

              {tailor.address || "-"}

            </p>

            <p>

              <strong>
                📞 No. HP / WhatsApp:
              </strong>{" "}

              {tailor.phone || "-"}

            </p>

          </div>


          {/* BUTTON REVIEW */}

          <div
            style={{
              marginTop: "30px",
            }}
          >

            <button

              onClick={() =>

                setShowReviews(
                  !showReviews
                )

              }

              className="action-chat-btn"
            >
              💬 Lihat Review
            </button>

          </div>


          {/* FORM RATING */}

          {showRatingForm && (

            <div
              className="rating-form"
            >

              <select

                value={ratingValue}

                onChange={(e) =>

                  setRatingValue(
                    e.target.value
                  )

                }

              >

                <option value={5}>
                  ⭐⭐⭐⭐⭐
                </option>

                <option value={4}>
                  ⭐⭐⭐⭐
                </option>

                <option value={3}>
                  ⭐⭐⭐
                </option>

                <option value={2}>
                  ⭐⭐
                </option>

                <option value={1}>
                  ⭐
                </option>

              </select>

              <textarea

                value={review}

                onChange={(e) =>

                  setReview(
                    e.target.value
                  )

                }

                placeholder="Tulis review..."

                className="rating-textarea"

              />

              <button

                onClick={
                  handleSubmitRating
                }

                disabled={
                  isSubmitting
                }

                className="submit-rating-btn"

              >

                {isSubmitting
                  ? "Mengirim..."
                  : "Kirim Rating"}

              </button>

            </div>

          )}


          {/* REVIEW CUSTOMER */}

          {showReviews && (

            <div
              className="review-section"
            >

              <h3>
                Review Customer
              </h3>

              {ratings.length > 0 ? (

                ratings.map(
                  (item) => (

                    <div
                      key={item.id}

                      className="review-card"
                    >

                      <div className="review-name">

                        ⭐ {item.rating}

                      </div>

                      <div className="review-text">

                        {item.review}

                      </div>

                    </div>

                  )
                )

              ) : (

                <p>
                  Belum ada review.
                </p>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default TailorDetail;