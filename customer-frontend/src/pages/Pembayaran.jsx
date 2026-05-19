import { useParams, useNavigate } from "react-router-dom";

const Pembayaran = () => {
  const { bookingId } = useParams(); // Mengambil ID dari URL (/pembayaran/:bookingId)
  const navigate = useNavigate();

  return (
    <div style={{ padding: "140px 20px 40px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
      <div style={{
        maxWidth: "500px", 
        margin: "0 auto", 
        border: "1px solid #e8e8c8", 
        padding: "30px", 
        borderRadius: "12px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.04)"
      }}>
        <h2 style={{ color: "#000000" }}>Halaman Pembayaran</h2>
        <p style={{ color: "#6b7280" }}>Kode Billing: <strong>ARKI-{bookingId}</strong></p>
        
        <hr style={{ border: "none", borderTop: "1px solid #e8e8c8", margin: "20px 0" }} />
        
        <div style={{ backgroundColor: "#fafafa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#4b5563" }}>Transfer ke Rekening Resmi ARKI:</p>
          <strong style={{ fontSize: "18px", color: "#000000" }}>BCA — 8042-3312-99</strong>
          <p style={{ margin: "5px 0", fontSize: "12px", color: "#6b7280" }}>a.n PT ARKI BUSANA NUSANTARA</p>
        </div>

        {/* Input file dummy simulasi upload bukti */}
        <input type="file" accept="image/*" style={{ marginBottom: "20px" }} />

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button 
            onClick={() => navigate("/pesanan")} 
            style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "1px solid #ccc", background: "#fff" }}
          >
            Kembali
          </button>
          
          <button 
            onClick={() => {
              alert("Pembayaran berhasil disimulasi!");
              navigate("/pesanan");
            }} 
            style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "6px", border: "none", background: "#10b981", color: "#fff", fontWeight: "bold" }}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

// Ini yang paling penting agar AppRoutes tidak error lagi!
export default Pembayaran;