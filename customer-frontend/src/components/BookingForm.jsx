import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // 💡 Sudah terimport dengan baik
import "./BookingForm.css";

const BookingForm = ({
  isOpen,
  onClose,
  selectedProduct,
  onSubmit,
  isSubmitting,
}) => {

  const [bookingDate, setBookingDate] = useState("");
  const [bodySizeNote, setBodySizeNote] = useState("");
  const [sizeType, setSizeType] = useState("katalog");
  const [selectedSize, setSelectedSize] = useState("");

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedProduct) {
      if (
        selectedProduct.size &&
        selectedProduct.size !== "NULL" &&
        selectedProduct.size !== ""
      ) {
        setSizeType("katalog");
        setSelectedSize("");
      } else {
        setSizeType("custom");
        setSelectedSize("Custom");
      }

      setBodySizeNote(
        `Detail Ukuran Badan:
- Lingkar Dada (cm):
- Panjang Baju (cm):
- Lebar Bahu (cm):
- Lingkar Pinggang (cm):

Catatan Tambahan Kain/Model:`
      );
    }
  }, [selectedProduct]);

  if (!isOpen || !selectedProduct) return null;

  // 💡 DI SINI PERUBAHANNYA: Mengubah fungsi menjadi async untuk mendukung alur notifikasi yang sinkron
  const handleSubmitInternal = async (e) => {
    e.preventDefault();

    // VALIDASI TANGGAL
    const todayStr = getTodayDateString();
    if (bookingDate < todayStr) {
      toast.dismiss();
      toast.error("Tanggal pertemuan tidak boleh kurang dari hari ini!");
      return;
    }

    const finalNote =
      sizeType === "custom"
        ? `Model Pakaian: ${selectedProduct.name}
Metode Ukuran: Custom Ukuran Baru

${bodySizeNote}`
        : `Model Pakaian: ${selectedProduct.name}
Metode Ukuran: Ukuran Standar Katalog (${selectedSize})`;

    try {
      // Menjalankan fungsi onSubmit dari Layanan.jsx dan menunggu hingga proses API backend selesai
      await onSubmit({
        bookingDate,
        finalNote,
        selectedSize,
        productDetail: selectedProduct, 
      });

      // 🎯 TAMBAHAN: Memicu toast sukses hanya ketika await onSubmit berhasil tanpa melempar error
      toast.success(`Berhasil mengajukan booking untuk ${selectedProduct.name}!`);
      
    } catch (error) {
      // Antisipasi jika error tidak di-handle di file parent
      console.error("Error form submission:", error);
      toast.error("Gagal mengirim pengajuan, silakan coba lagi.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Formulir Pengajuan Booking</h3>
          <p>
            Model Baju:{" "}
            <strong className="product-highlight">
              {selectedProduct.name}
            </strong>
          </p>
        </div>

        <form onSubmit={handleSubmitInternal} className="booking-form-element">
          {/* TANGGAL */}
          <div className="form-group">
            <label>Rencana Tanggal Pertemuan:</label>
            <input
              type="date"
              value={bookingDate}
              min={getTodayDateString()} 
              onChange={(e) => setBookingDate(e.target.value)}
              className="form-input-date"
              required
            />
          </div>

          {/* PILIHAN METODE */}
          <div className="form-group">
            <label>Pilihan Metode Ukuran:</label>
            <div className="segmented-control">
              {selectedProduct.size &&
                selectedProduct.size !== "NULL" &&
                selectedProduct.size !== "" && (
                  <button
                    type="button"
                    onClick={() => {
                      setSizeType("katalog");
                      setSelectedSize("");
                    }}
                    className={`segment-btn ${sizeType === "katalog" ? "active" : ""}`}
                  >
                    Ukuran Katalog
                  </button>
                )}

              <button
                type="button"
                onClick={() => {
                  setSizeType("custom");
                  setSelectedSize("Custom");
                }}
                className={`segment-btn ${sizeType === "custom" ? "active" : ""}`}
              >
                Custom Ukuran Baru
              </button>
            </div>
          </div>

          {/* DROPDOWN UKURAN */}
          {sizeType === "katalog" && selectedProduct.size && (
            <div className="form-group">
              <label>Pilih Ukuran Tersedia:</label>
              <div className="select-wrapper">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="form-style" // Menyesuaikan class style standard jika diperlukan
                  required
                >
                  <option value="">Pilih Ukuran</option>
                  {selectedProduct.size.split(",").map((size, index) => (
                    <option key={index} value={size.trim()}>
                      {size.trim()}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>
          )}

          {/* CUSTOM SIZE */}
          {sizeType === "custom" && (
            <div className="form-group">
              <label>Detail Lembar Catatan Ukuran Mandiri:</label>
              <textarea
                value={bodySizeNote}
                onChange={(e) => setBodySizeNote(e.target.value)}
                className="form-textarea"
                required
              />
            </div>
          )}

          {/* BUTTON */}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-submit">
              {isSubmitting ? "Mengirim..." : "Kirim Pengajuan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;