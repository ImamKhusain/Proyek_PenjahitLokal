import {
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast"; // 💡 TAMBAHAN: Import toast untuk notifikasi modern

import {
  AuthContext,
} from "../context/AuthContext";


const Pembayaran = () => {

  const { bookingId } =
    useParams();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const booking =
    location.state?.booking;

  const { user } =
    useContext(AuthContext);


  // =========================
  // STATE
  // =========================

  const [paymentMethod, setPaymentMethod] =
    useState("Transfer Bank");

  const [amount, setAmount] =
    useState(
      booking?.portfolio?.price || 0
    );

  const [paymentProof, setPaymentProof] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // =========================
  // HANDLE FILE
  // =========================

  const handleFileChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setPaymentProof(file);

      setPreview(
        URL.createObjectURL(file)
      );

  };


  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit =
    async () => {

      try {

        if (!paymentProof) {
          // 💡 GANTI KE TOAST: Menghapus antrean lama dan memunculkan toast error
          toast.dismiss();
          toast.error("Silakan unggah bukti pembayaran Anda terlebih dahulu!");
          return;

        }

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "booking_id",
          bookingId
        );

        formData.append(
          "payment_method",
          paymentMethod
        );

        formData.append(
          "amount",
          amount
        );

        formData.append(
          "payment_proof",
          paymentProof
        );


        // API
        await axios.post(

          "http://localhost:8080/api/payments",

          formData,

          {
            headers: {

              Authorization:
                `Bearer ${user.token}`,

              "Content-Type":
                "multipart/form-data",

            },
          }

        );

        // 💡 GANTI KE TOAST: Sukses unggah bukti transfer pembayaran
        toast.dismiss();
        toast.success("Bukti pembayaran Anda berhasil diunggah!");

        navigate("/pesanan");

      } catch (error) {

        console.log(error);

        // 💡 GANTI KE TOAST: Menangkap pesan gagal dari server
        toast.dismiss();
        toast.error(
          error.response?.data?.message ||
          "Gagal mengunggah bukti pembayaran, silakan coba lagi nanti."
        );

      } finally {

        setLoading(false);

      }

  };


  return (

    <div
      style={{
        padding:
          "140px 20px 40px 20px",

        fontFamily:
          "sans-serif",

        background:
          "#fafafa",

        minHeight:
          "100vh",
      }}
    >

      <div
        style={{

          maxWidth:
            "550px",

          margin:
            "0 auto",

          background:
            "#ffffff",

          borderRadius:
            "18px",

          padding:
            "32px",

          boxShadow:
            "0 8px 30px rgba(0,0,0,0.06)",
        }}
      >

        {/* TITLE */}

        <h2
          style={{
            marginBottom:
              "8px",
          }}
        >
          Pembayaran Booking
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "24px",
          }}
        >
          Kode Billing:
          <strong>
            {" "}ARKI-{bookingId}
          </strong>
        </p>


        {/* INFO PESANAN */}

        <div
          style={{
            background:
              "#f9fafb",

            padding:
              "18px",

            borderRadius:
              "12px",

            marginBottom:
              "24px",
          }}
        >

          <p>
            <strong>Penjahit:</strong>{" "}
            {booking?.tailor?.name}
          </p>

          <p>
            <strong>Model:</strong>{" "}
            {booking?.portfolio?.title}
          </p>

          <p>
            <strong>Harga:</strong>{" "}
            Rp{" "}
            {Number(amount)
              .toLocaleString("id-ID")}
          </p>

        </div>


        {/* BANK INFO */}

        <div
          style={{
            background:
              "#f9fafb",

            padding:
              "18px",

            borderRadius:
              "12px",

            marginBottom:
              "24px",
          }}
        >

          <p
            style={{
              margin:
                "0 0 8px 0",
            }}
          >
            Transfer ke rekening:
          </p>

          <h3
            style={{
              margin:
                "0",
            }}
          >
            BCA — 8042331299
          </h3>

          <small>
            a.n PT ARKI BUSANA NUSANTARA
          </small>

        </div>


        {/* METHOD */}

        <div
          style={{
            marginBottom:
              "20px",
          }}
        >

          <label>
            Metode Pembayaran
          </label>

          <select

            value={paymentMethod}

            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }

            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >

            <option>
              Transfer Bank
            </option>

            <option>
              QRIS
            </option>

            <option>
              E-Wallet
            </option>

          </select>

        </div>


        {/* AMOUNT */}

        <div
          style={{
            marginBottom:
              "20px",
          }}
        >

          <label>
            Nominal
          </label>

          <input
            type="number"

            value={amount}

            readOnly

            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background:
                "#f3f4f6",
            }}
          />

        </div>


        {/* FILE */}

        <div
          style={{
            marginBottom:
              "24px",
          }}
        >

          <label>
            Upload Bukti Pembayaran
          </label>

          <input
            type="file"

            accept="image/*"

            onChange={handleFileChange}

            style={{
              marginTop: "10px",
            }}
          />

        </div>


        {/* PREVIEW */}

        {preview && (

          <div
            style={{
              marginBottom:
                "24px",
            }}
          >

            <img
              src={preview}

              alt="Preview"

              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />

          </div>

        )}


        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >

          <button

            onClick={() =>
              navigate("/pesanan")
            }

            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Kembali
          </button>

          <button

            onClick={handleSubmit}

            disabled={loading}

            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#10b981",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >

            {loading
              ? "Uploading..."
              : "Konfirmasi"}

          </button>

        </div>

      </div>

    </div>
  );

};

export default Pembayaran;