import { useNavigate } from "react-router-dom";
import TailorForm from "../components/TailorForm";

const ManageTailor = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Tambah Penjahit Baru</h1>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 15px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Kembali
        </button>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Panggil komponen form di sini */}
        <TailorForm />
      </div>
    </div>
  );
};

export default ManageTailor;