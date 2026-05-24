import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./BookingForm.css";

const BookingForm = ({
  isOpen,
  onClose,
  selectedProduct,
  onSubmit,
  isSubmitting,
}) => {

  // ==========================================
  // STATES
  // ==========================================

  const [bookingDate, setBookingDate] =
    useState("");

  const [bodySizeNote, setBodySizeNote] =
    useState("");

  const [sizeType, setSizeType] =
    useState("katalog");

  const [selectedSize, setSelectedSize] =
    useState("");

  // ==========================================
  // GET TODAY DATE
  // ==========================================

  const getTodayDateString = () => {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;

  };

  // ==========================================
  // AUTO SET FORM
  // ==========================================

  useEffect(() => {

    if (selectedProduct) {

      // ======================================
      // SIZE KATALOG
      // ======================================

      if (

        selectedProduct.size &&

        selectedProduct.size !==
          "NULL" &&

        selectedProduct.size !==
          ""

      ) {

        setSizeType(
          "katalog"
        );

        setSelectedSize(
          ""
        );

      }

      // ======================================
      // CUSTOM
      // ======================================

      else {

        setSizeType(
          "custom"
        );

        setSelectedSize(
          "Custom"
        );

      }

      // ======================================
      // DEFAULT NOTE
      // ======================================

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

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  if (
    !isOpen ||
    !selectedProduct
  ) return null;

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmitInternal =
    async (e) => {

      e.preventDefault();

      try {

        // =====================================
        // VALIDASI TANGGAL KOSONG
        // =====================================

        if (!bookingDate) {

          toast.dismiss();

          toast.error(
            "Tanggal booking wajib diisi!"
          );

          return;

        }

        // =====================================
        // VALIDASI TANGGAL
        // =====================================

        const today =
          new Date();

        today.setHours(
          0,
          0,
          0,
          0
        );

        const selectedDate =
          new Date(
            bookingDate
          );

        selectedDate.setHours(
          0,
          0,
          0,
          0
        );

        // =====================================
        // TANGGAL KURANG DARI HARI INI
        // =====================================

        if (
          selectedDate < today
        ) {

          toast.dismiss();

          toast.error(
            "Tanggal booking tidak boleh kurang dari hari ini!"
          );

          return;

        }

        // =====================================
        // VALIDASI UKURAN KATALOG
        // =====================================

        if (
          sizeType ===
            "katalog" &&
          !selectedSize
        ) {

          toast.dismiss();

          toast.error(
            "Pilih ukuran katalog terlebih dahulu!"
          );

          return;

        }

        // =====================================
        // VALIDASI CUSTOM NOTE
        // =====================================

        if (
          sizeType ===
            "custom" &&
          !bodySizeNote.trim()
        ) {

          toast.dismiss();

          toast.error(
            "Detail ukuran custom wajib diisi!"
          );

          return;

        }

        // =====================================
        // VALIDASI NOTE PENDEK
        // =====================================

        if (

          sizeType ===
            "custom" &&

          bodySizeNote.trim()
            .length < 15

        ) {

          toast.dismiss();

          toast.error(
            "Detail ukuran terlalu pendek!"
          );

          return;

        }

        // =====================================
        // FINAL NOTE
        // =====================================

        const finalNote =
          sizeType === "custom"

            ? `Model Pakaian: ${selectedProduct.name}
Metode Ukuran: Custom Ukuran Baru

${bodySizeNote}`

            : `Model Pakaian: ${selectedProduct.name}
Metode Ukuran: Ukuran Standar Katalog (${selectedSize})`;

        // =====================================
        // LOADING TOAST
        // =====================================

        const loadingToast =
          toast.loading(
            "Mengirim booking..."
          );

        // =====================================
        // SUBMIT API
        // =====================================

        await onSubmit({

          bookingDate,

          finalNote,

          selectedSize,

          productDetail:
            selectedProduct,

        });

        // =====================================
        // SUCCESS
        // =====================================

        toast.dismiss(
          loadingToast
        );

        toast.success(
          "Booking berhasil dikirim! Silakan tunggu konfirmasi tailor."
        );

        // =====================================
        // RESET FORM
        // =====================================

        setBookingDate("");

        setSelectedSize("");

        setBodySizeNote("");

        // =====================================
        // CLOSE MODAL
        // =====================================

        onClose();

      } catch (error) {

        console.log(error);

        // =====================================
        // ERROR MESSAGE
        // =====================================

        const errorMessage =

          error?.response?.data
            ?.message ||

          error?.response?.data
            ?.error ||

          error?.message ||

          "Terjadi kesalahan saat mengirim booking.";

        // =====================================
        // NETWORK ERROR
        // =====================================

        if (

          errorMessage
            .toLowerCase()
            .includes(
              "network"
            )

        ) {

          toast.error(
            "Koneksi internet bermasalah."
          );

        }

        // =====================================
        // LOGIN ERROR
        // =====================================

        else if (

          errorMessage
            .toLowerCase()
            .includes(
              "unauthorized"
            )

        ) {

          toast.error(
            "Sesi login berakhir. Silakan login ulang."
          );

        }

        // =====================================
        // VALIDATION ERROR
        // =====================================

        else if (

          errorMessage
            .toLowerCase()
            .includes(
              "validation"
            )

        ) {

          toast.error(
            "Data booking tidak valid."
          );

        }

        // =====================================
        // DUPLICATE ERROR
        // =====================================

        else if (

          errorMessage
            .toLowerCase()
            .includes(
              "duplicate"
            )

        ) {

          toast.error(
            "Booking sudah pernah dibuat."
          );

        }

        // =====================================
        // DEFAULT ERROR
        // =====================================

        else {

          toast.error(
            errorMessage
          );

        }

      }

    };

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="modal-overlay">

      <div className="modal-container">

        {/* HEADER */}

        <div className="modal-header">

          <h3>
            Formulir Pengajuan Booking
          </h3>

          <p>
            Model Baju:{" "}

            <strong className="product-highlight">

              {selectedProduct.name}

            </strong>

          </p>

        </div>

        {/* FORM */}

        <form

          onSubmit={
            handleSubmitInternal
          }

          className="booking-form-element"
        >

          {/* DATE */}

          <div className="form-group">

            <label>
              Rencana Tanggal Pertemuan:
            </label>

            <input

              type="date"

              value={bookingDate}

              min={
                getTodayDateString()
              }

              onChange={(e) =>

                setBookingDate(
                  e.target.value
                )

              }

              className="form-input-date"
            />

          </div>

          {/* SIZE METHOD */}

          <div className="form-group">

            <label>
              Pilihan Metode Ukuran:
            </label>

            <div className="segmented-control">

              {/* KATALOG */}

              {selectedProduct.size &&
                selectedProduct.size !==
                  "NULL" &&
                selectedProduct.size !==
                  "" && (

                  <button

                    type="button"

                    onClick={() => {

                      setSizeType(
                        "katalog"
                      );

                      setSelectedSize(
                        ""
                      );

                    }}

                    className={`segment-btn ${
                      sizeType ===
                      "katalog"
                        ? "active"
                        : ""
                    }`}
                  >

                    Ukuran Katalog

                  </button>

                )}

              {/* CUSTOM */}

              <button

                type="button"

                onClick={() => {

                  setSizeType(
                    "custom"
                  );

                  setSelectedSize(
                    "Custom"
                  );

                }}

                className={`segment-btn ${
                  sizeType ===
                  "custom"
                    ? "active"
                    : ""
                }`}
              >

                Custom Ukuran Baru

              </button>

            </div>

          </div>

          {/* DROPDOWN */}

          {sizeType ===
            "katalog" &&

            selectedProduct.size && (

              <div className="form-group">

                <label>
                  Pilih Ukuran Tersedia:
                </label>

                <div className="select-wrapper">

                  <select

                    value={selectedSize}

                    onChange={(e) =>

                      setSelectedSize(
                        e.target.value
                      )

                    }

                    className="form-select"
                  >

                    <option value="">
                      Pilih Ukuran
                    </option>

                    {selectedProduct.size
                      .split(",")
                      .map(
                        (
                          size,
                          index
                        ) => (

                          <option
                            key={index}
                            value={size.trim()}
                          >

                            {size.trim()}

                          </option>

                        )
                      )}

                  </select>

                  <div className="select-arrow">
                    ▼
                  </div>

                </div>

              </div>

            )}

          {/* CUSTOM */}

          {sizeType ===
            "custom" && (

              <div className="form-group">

                <label>
                  Detail Lembar Catatan Ukuran Mandiri:
                </label>

                <textarea

                  value={bodySizeNote}

                  onChange={(e) =>

                    setBodySizeNote(
                      e.target.value
                    )

                  }

                  className="form-textarea"
                />

              </div>

            )}

          {/* BUTTONS */}

          <div className="modal-actions">

            {/* CANCEL */}

            <button

              type="button"

              onClick={onClose}

              className="btn-cancel"
            >

              Batal

            </button>

            {/* SUBMIT */}

            <button

              type="submit"

              disabled={isSubmitting}

              className="btn-submit"
            >

              {isSubmitting
                ? "Mengirim..."
                : "Kirim Pengajuan"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default Booking;