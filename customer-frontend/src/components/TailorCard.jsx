import {
  useNavigate,
} from "react-router-dom";

import "./TailorCard.css";

const TailorCard = ({
  tailor,
}) => {

  const navigate =
    useNavigate();

  // =====================================
  // VALIDASI FOTO
  // =====================================

  const hasPhoto =

    tailor.photo &&

    tailor.photo !== "NULL" &&

    tailor.photo !== "";

  // =====================================
  // FIREBASE IMAGE URL
  // =====================================

  const imageUrl =

    hasPhoto

      ? tailor.photo

      : "https://placehold.co/300x300?text=No+Photo";


  return (

    <div className="tailor-card">

      {/* FOTO PENJAHIT */}

      <img

        src={imageUrl}

        alt={
          tailor.name ||
          "Penjahit"
        }

        className="tailor-card-img"

        onError={(e) => {

          e.target.onerror =
            null;

          e.target.src =
            "https://placehold.co/300x300?text=No+Photo";

        }}

      />

      {/* INFO */}

      <div className="tailor-card-info">

        {/* NAMA */}

        <h3 className="tailor-card-name">

          {tailor.name ||
            "Nama Belum Diatur"}

        </h3>

        {/* RATING */}

        <div className="tailor-card-rating-row">

          <span className="tailor-card-star">
            ⭐
          </span>

          <span>

            {parseFloat(
              tailor.rating || 0
            ).toFixed(1)}

          </span>

          <span className="tailor-card-review-count">

            (
            {" "}

            {tailor.total_reviews || 0}

            {" "}
            )

          </span>

        </div>

      </div>

      {/* BUTTON */}

      <button

        onClick={() =>

          navigate(
            `/detail/${tailor.id}`
          )

        }

        className="tailor-card-btn"
      >
        Detail
      </button>

    </div>

  );

};

export default TailorCard;