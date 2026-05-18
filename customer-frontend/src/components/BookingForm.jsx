import { useState, useEffect } from "react";
import "./BookingForm.css"; // 💡 Import file CSS baru

const BookingForm = ({ isOpen, onClose, selectedProduct, onSubmit, isSubmitting }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [bodySizeNote, setBodySizeNote] = useState("");
  const [sizeType, setSizeType] = useState("katalog");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.size && selectedProduct.size !== "NULL" && selectedProduct.size !== "") {
        setSizeType("katalog");
        setSelectedSize(selectedProduct.size);
      } else {
        setSizeType("custom");
        setSelectedSize("Custom");
      }
      setBodySizeNote(`Detail Ukuran Badan:\n- Lingkar Dada (cm):\n- Panjang Baju (cm):\n- Lebar Bahu (cm):\n- Lingkar Pinggang (cm):\n\nCatatan Tambahan Kain/Model:`);
    }
  }, [selectedProduct]);

  if (!isOpen || !selectedProduct) return null;

  const handleSubmitInternal = (e) => {
    e.preventDefault();
    const finalNote = sizeType === "custom"
      ? `Model Pakaian: ${selectedProduct.name}\nMetode Ukuran: Custom Ukuran Baru\n\n${bodySizeNote}`
      : `Model Pakaian: ${selectedProduct.name}\nMetode Ukuran: Ukuran Standar Katalog (${selectedSize})`;

    onSubmit({ bookingDate, finalNote });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Formulir Pengajuan Booking</h3>
          <p>Model Baju: <strong className="product-highlight">{selectedProduct.name}</strong></p>
        </div>
        
        <form onSubmit={handleSubmitInternal} className="booking-form-element">
          <div className="form-group">
            <label>Rencana Tanggal Pertemuan:</label>
            <input 
              type="date" 
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="form-input-date"
              required
            />
          </div>

          <div className="form-group">
            <label>Pilihan Metode Ukuran:</label>
            <div className="segmented-control">
              {selectedProduct.size && selectedProduct.size !== "NULL" && selectedProduct.size !== "" && (
                <button 
                  type="button"
                  onClick={() => { setSizeType("katalog"); setSelectedSize(selectedProduct.size); }}
                  className={`segment-btn ${sizeType === "katalog" ? "active" : ""}`}
                >
                  Ukuran Katalog
                </button>
              )}
              <button 
                type="button"
                onClick={() => { setSizeType("custom"); setSelectedSize("Custom"); }}
                className={`segment-btn ${sizeType === "custom" ? "active" : ""}`}
              >
                Custom Ukuran Baru
              </button>
            </div>
          </div>

          {sizeType === "katalog" && selectedProduct.size && (
            <div className="form-group">
              <label>Pilih Ukuran Tersedia:</label>
              <div className="select-wrapper">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="form-select"
                >
                  <option value={selectedProduct.size}>Ukuran Standar Katalog ({selectedProduct.size})</option>
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>
          )}

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

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
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