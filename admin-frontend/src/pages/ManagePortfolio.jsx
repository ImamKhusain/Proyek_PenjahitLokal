import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; // TAMBAHKAN useParams
import { AuthContext } from "../context/AuthContext";
import { getMyPortfolios } from "../services/portfolioService";

const ManagePortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 1. TANGKAP ID TAILOR LANGSUNG DARI URL BROWSER
  const { user } = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    // CEK LOGIN
    if (!user) {
      navigate("/");
      return;
    }
    fetchPortfolio();
  }, [user, id]);

  const fetchPortfolio = async () => {
    try {
      // 2. KITA TIDAK PERLU getMyTailor() LAGI, LANGSUNG PAKAI ID DARI URL
      console.log("Mengambil portfolio untuk Tailor ID:", id);

      const responseData = await getMyPortfolios(id);
      console.log("Data Portfolio dari Backend:", responseData);

      // Antisipasi kalau data terbungkus di .data lagi
      const actualData = responseData?.data ? responseData.data : responseData;

      if (Array.isArray(actualData)) {
        setPortfolios(actualData);
      } else if (actualData) {
        setPortfolios([actualData]);
      } else {
        setPortfolios([]);
      }
    } catch (error) {
      console.log("Error mengambil portfolio:", error);
    }
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Manage Portfolio</h1>
        <button 
          onClick={() => navigate("/dashboard")} 
          style={{ padding: "10px 15px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Kembali ke Dashboard
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {portfolios.length > 0 ? (
          portfolios.map((item) => (
            <div
              key={item.id}
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image_url}
                alt="portfolio"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <p style={{ marginTop: "10px" }}>{item.description}</p>
            </div>
          ))
        ) : (
          <p>Belum ada foto portfolio untuk penjahit ini.</p>
        )}
      </div>
    </div>
  );
};

export default ManagePortfolio;