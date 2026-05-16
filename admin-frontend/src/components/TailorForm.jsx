import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Sesuaikan import API/Service kamu di sini
import api from "../services/api"; 

const TailorForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Pisahkan state untuk teks dan file
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    description: "",
    address: "",
    phone: "",
  });
  const [photo, setPhoto] = useState(null);

  // Handle perubahan input teks
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle perubahan input file
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Wajib pakai FormData jika ada upload file
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("specialization", formData.specialization);
      submitData.append("description", formData.description);
      submitData.append("address", formData.address);
      submitData.append("phone", formData.phone);
      
      if (photo) {
        submitData.append("photo", photo); // Key "photo" ini harus sama dengan upload.single("photo") di backend
      }

      // Kirim ke backend (Sesuaikan endpoint API kamu)
      // Pastikan ada header token jika route-nya diproteksi authMiddleware
      const token = localStorage.getItem("token"); // Ambil token dari storage
      await api.post("/tailors", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Data penjahit berhasil ditambahkan!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data penjahit.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Nama Penjahit</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Foto Profil</label>
        <input type="file" name="photo" accept="image/*" onChange={handleFileChange} style={inputStyle} />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Spesialisasi (Misal: Kebaya, Jas)</label>
        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} style={inputStyle} required />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Deskripsi Singkat</label>
        <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Alamat Lengkap</label>
        <textarea name="address" value={formData.address} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Nomor HP</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} required />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {loading ? "Menyimpan..." : "Simpan Data Penjahit"}
      </button>
    </form>
  );
};

export default TailorForm;