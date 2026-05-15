const TailorCard = ({ tailor }) => {

  return (
    <div className="tailor-card">

      <h3>
        {tailor.specialization}
      </h3>

      <p>
        {tailor.description}
      </p>

      <p>
        {tailor.address}
      </p>

      <p>
        {tailor.phone}
      </p>

      <button>
        Detail
      </button>

    </div>
  );
};

export default TailorCard;