import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PortofolioForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Menangkap ID Tailor dari URL
  const { user } = useContext(AuthContext);

  // State Form sesuai dengan struktur database Anda
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Proteksi halaman agar wajib login
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handler saat user memilih file gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Membuat preview gambar lokal
    }
  };

  // Handler kirim data form ke Backend
// Handler kirim data form ke Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!name || !price || !imageFile) {
      setMessage("Nama, Harga, dan Foto wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      // Menggunakan FormData karena terdapat file unggahan (bukan JSON murni)
      const formData = new FormData();
      formData.append("tailor_id", id);
      formData.append("name", name);
      formData.append("description", description);
      
      // PERBAIKAN 1: Konversi price dari string menjadi Integer angka agar database tidak menolak
      formData.append("price", parseInt(price, 10)); 
      
      formData.append("size", size);
      
      // PERBAIKAN 2: Sudah tepat menggunakan "image" sesuai upload.catalog.single("image") di backend
      formData.append("image", imageFile); 

      const token = localStorage.getItem("token") || user?.token;

      const response = await axios.post("http://localhost:8080/api/portfolios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Mengirim JWT Token auth ke backend
        },
      });

      if (response.status === 201 || response.status === 200) {
        alert("Portofolio baru berhasil disimpan!");
        navigate(`/manage-portfolio/${id}`); // Kembali ke dashboard portfolio
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      
      // PERBAIKAN 3: Menangkap pesan asli dari backend jika ada (misalnya error validasi dari model/controller)
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      setMessage(backendMessage || "Gagal menyimpan data ke backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tambah Portofolio Baru</h2>
        
        {message && <div style={styles.alert}>{message}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nama Pakaian *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Kebaya Modern Brokat"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Harga Pembuatan (Rp) *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Contoh: 450000"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Ukuran (Size)</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Contoh: S, M, L, XL atau Custom"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Deskripsi Pakaian</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan detail pengerjaan atau bahan pakaian di sini..."
              style={{ ...styles.input, height: "100px", resize: "vertical" }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Foto Hasil Jahitan *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
              required
            />
            {previewUrl && (
              <div style={styles.previewContainer}>
                <p style={{ fontSize: "12px", color: "#6c757d", marginBottom: "5px" }}>Pratinjau Gambar:</p>
                <img src={previewUrl} alt="Preview" style={styles.previewImage} />
              </div>
            )}
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => navigate(`/manage-portfolio/${id}`)}
              style={styles.cancelButton}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px 20px", backgroundColor: "#f5f5f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" },
  card: { width: "100%", maxWidth: "500px", backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0,0,0,0.05)" },
  title: { margin: "0 0 20px 0", fontSize: "24px", color: "#212529", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#495057" },
  input: { padding: "10px", fontSize: "14px", border: "1px solid #ced4da", borderRadius: "5px", outline: "none" },
  fileInput: { fontSize: "14px" },
  previewContainer: { marginTop: "10px" },
  previewImage: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px", border: "1px solid #dee2e6" },
  alert: { padding: "10px", backgroundColor: "#f8d7da", color: "#721c24", borderRadius: "5px", fontSize: "14px", marginBottom: "15px", border: "1px solid #f5c6cb" },
  buttonContainer: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" },
  cancelButton: { padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  submitButton: { padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }
};

export default PortofolioForm;