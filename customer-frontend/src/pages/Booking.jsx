import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

import "./Booking.css";

const API_URL =
  "https://proyek-penjahitlokal-764024000152.us-central1.run.app";

const Booking = () => {

  const navigate =
    useNavigate();

  const {
    user,
    loading,
  } = useContext(
    AuthContext
  );

  // ==========================================
  // STATES
  // ==========================================

  const [
    pesananList,
    setPesananList,
  ] = useState([]);

  const [
    paidBookingIds,
    setPaidBookingIds,
  ] = useState([]);

  const [
    errorFetch,
    setErrorFetch,
  ] = useState(false);

  const [
    editingBookingId,
    setEditingBookingId,
  ] = useState(null);

  const [
    selectedBooking,
    setSelectedBooking,
  ] = useState(null);

  const [
    newBookingDate,
    setNewBookingDate,
  ] = useState("");

  // ==========================================
  // FETCH DATA
  // ==========================================

  useEffect(() => {

    if (loading) return;

    if (
      !user &&
      !localStorage.getItem("token")
    ) {

      navigate("/");
      return;

    }

    fetchMyBookingsAndPayments();

  }, [user, loading]);

  // ==========================================
  // FETCH BOOKINGS + PAYMENTS
  // ==========================================

  const fetchMyBookingsAndPayments =
    async () => {

      try {

        const tokenAktif =

          user?.token ||

          localStorage.getItem(
            "token"
          );

        const idUserAktif =

          user?.id ||

          localStorage.getItem(
            "id"
          );

        const cleanToken =

          tokenAktif.replace(
            /['"]+/g,
            ""
          );

        const headers = {

          Authorization:
            `Bearer ${cleanToken}`,

        };

        // ======================================
        // REQUEST
        // ======================================

        const [
          bookingsResponse,
          paymentsResponse,
        ] = await Promise.all([

          axios.get(
            `${API_URL}/api/bookings`,
            { headers }
          ),

          axios.get(
            `${API_URL}/api/payments`,
            { headers }
          ),

        ]);

        // ======================================
        // BOOKINGS
        // ======================================

        const allBookings =
          bookingsResponse.data
            ?.data || [];

        const myBookings =
          allBookings.filter(
            (booking) =>
              Number(
                booking.customer_id
              ) ===
              Number(
                idUserAktif
              )
          );

        myBookings.sort(
          (a, b) => b.id - a.id
        );

        // ======================================
        // PAYMENTS
        // ======================================

        const allPayments =
          paymentsResponse.data
            ?.data || [];

        const confirmedPaidIds =
          allPayments

            .filter(

              (payment) =>

                payment.payment_status
                  ?.toLowerCase()
                  ?.trim() ===
                "paid"

            )

            .map(
              (payment) =>
                payment.booking_id
            );

        // ======================================
        // SAVE STATE
        // ======================================

        setPesananList(
          myBookings
        );

        setPaidBookingIds(
          confirmedPaidIds
        );

      } catch (error) {

        console.log(error);

        setErrorFetch(true);

        toast.error(
          "Gagal mengambil data pesanan."
        );

      }

    };

  // ==========================================
  // DELETE BOOKING
  // ==========================================

  const handleDeleteBooking =
    async (bookingId) => {

      try {

        const tokenAktif =

          user?.token ||

          localStorage.getItem(
            "token"
          );

        const cleanToken =

          tokenAktif.replace(
            /['"]+/g,
            ""
          );

        await axios.delete(

          `${API_URL}/api/bookings/${bookingId}`,

          {

            headers: {

              Authorization:
                `Bearer ${cleanToken}`,

            },

          }

        );

        toast.success(
          "Pesanan berhasil dihapus."
        );

        fetchMyBookingsAndPayments();

      } catch (error) {

        console.log(error);

        toast.error(
          "Gagal menghapus pesanan."
        );

      }

    };

  // ==========================================
  // UPDATE BOOKING DATE
  // ==========================================

  const handleUpdateBooking =
    async () => {

      try {

        // ======================================
        // VALIDASI KOSONG
        // ======================================

        if (!newBookingDate) {

          toast.error(
            "Tanggal booking wajib diisi."
          );

          return;

        }

        // ======================================
        // VALIDASI TANGGAL
        // ======================================

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
            newBookingDate
          );

        selectedDate.setHours(
          0,
          0,
          0,
          0
        );

        // ======================================
        // TANGGAL < HARI INI
        // ======================================

        if (
          selectedDate < today
        ) {

          toast.error(
            "Tanggal booking tidak boleh kurang dari hari ini."
          );

          return;

        }

        // ======================================
        // TOKEN
        // ======================================

        const tokenAktif =

          user?.token ||

          localStorage.getItem(
            "token"
          );

        const cleanToken =

          tokenAktif.replace(
            /['"]+/g,
            ""
          );

        // ======================================
        // UPDATE
        // ======================================

        await axios.put(

          `${API_URL}/api/bookings/${selectedBooking.id}`,

          {

            booking_date:
              newBookingDate,

            body_size_note:
              selectedBooking.body_size_note,

            status:
              "PENDING",

          },

          {

            headers: {

              Authorization:
                `Bearer ${cleanToken}`,

            },

          }

        );

        toast.success(
          "Tanggal booking berhasil diperbarui."
        );

        setEditingBookingId(
          null
        );

        setSelectedBooking(
          null
        );

        fetchMyBookingsAndPayments();

      } catch (error) {

        console.log(error);

        toast.error(
          "Gagal memperbarui booking."
        );

      }

    };

  // ==========================================
  // PAYMENT
  // ==========================================

  const handlePaymentRedirect =
    async (pesanan) => {

      try {

        const tokenAktif =

          user?.token ||

          localStorage.getItem(
            "token"
          );

        const cleanToken =

          tokenAktif.replace(
            /['"]+/g,
            ""
          );

        const paymentResponse =
          await axios.get(

            `${API_URL}/api/payments`,

            {

              headers: {

                Authorization:
                  `Bearer ${cleanToken}`,

              },

            }

          );

        const allPayments =
          paymentResponse.data
            ?.data || [];

        // ======================================
        // SUDAH PAID
        // ======================================

        const existingPaid =
          allPayments.find(

            (payment) =>

              Number(
                payment.booking_id
              ) ===
                Number(
                  pesanan.id
                ) &&

              payment.payment_status
                ?.toLowerCase()
                ?.trim() ===
                "paid"

          );

        if (existingPaid) {

          toast.success(
            "Pembayaran sudah diverifikasi admin."
          );

          return;

        }

        // ======================================
        // HARUS ACCEPTED
        // ======================================

        if (
          pesanan.status
            ?.toLowerCase() !==
          "accepted"
        ) {

          toast.error(
            "Pesanan belum bisa dibayar."
          );

          return;

        }

        navigate(
          `/pembayaran/${pesanan.id}`,
          {
            state: {
              booking: pesanan,
            },
          }
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Gagal memvalidasi pembayaran."
        );

      }

    };

  // ==========================================
  // FORMAT RUPIAH
  // ==========================================

  const formatRupiah =
    (angka) => {

      if (
        !angka ||
        isNaN(angka)
      ) {

        return "Belum ditentukan";

      }

      return new Intl.NumberFormat(
        "id-ID",
        {

          style: "currency",

          currency: "IDR",

          maximumFractionDigits: 0,

        }

      ).format(angka);

    };

  // ==========================================
  // FORMAT TANGGAL
  // ==========================================

  const formatTanggal =
    (dateString) => {

      if (!dateString)
        return "-";

      return new Date(
        dateString
      ).toLocaleDateString(
        "id-ID",
        {

          year: "numeric",

          month: "long",

          day: "numeric",

        }
      );

    };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="booking-loading-screen">

        <h3>
          Memuat Data Pesanan...
        </h3>

      </div>

    );

  }

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="booking-page-container">

      <div className="booking-content-wrapper">

        {/* HEADER */}

        <div className="booking-header">

          <h1>
            Pesanan Saya
          </h1>

          <p>
            Pantau proses pengerjaan
            busana Anda secara
            real-time
          </p>

        </div>

        {/* ERROR */}

        {errorFetch && (

          <div className="booking-error-message">

            <p>
              Gagal mengambil data
              pesanan.
            </p>

          </div>

        )}

        {/* EMPTY */}

        {pesananList.length === 0 ? (

          <div className="booking-empty-state">

            <div className="empty-box-icon">
              📦
            </div>

            <h3>
              Belum Ada Pesanan
            </h3>

            <p>
              Anda belum memiliki
              pesanan aktif.
            </p>

            <button
              className="btn-order-now"
              onClick={() =>
                navigate("/home")
              }
            >
              Pesan Sekarang
            </button>

          </div>

        ) : (

          <div className="booking-list">

            {pesananList.map(
              (pesanan) => {

                const isPaid =
                  paidBookingIds.includes(
                    pesanan.id
                  );

                const bookingStatus =
                  pesanan.status
                    ?.toLowerCase();

                return (

                  <div
                    key={pesanan.id}
                    className={`booking-card status-border-${bookingStatus}`}
                  >

                    {/* MAIN */}

                    <div className="booking-card-main">

                      {/* LEFT */}

                      <div className="booking-details">

                        <div className="booking-card-header">

                          <h3>
                            {pesanan.service_type ||
                              "ARKI -"}
                          </h3>

                          <span className="booking-id-tag">
                            #{pesanan.id}
                          </span>

                        </div>

                        {/* INFO */}

                        <div className="note-text-box-premium">

                          <h4 className="note-category-title">
                            INFORMASI BOOKING
                          </h4>

                          <p className="note-line-item">

                            <strong>
                              Tanggal Booking:
                            </strong>{" "}

                            {formatTanggal(
                              pesanan.booking_date
                            )}

                          </p>

                          <p className="note-line-item">

                            <strong>
                              Total Harga:
                            </strong>{" "}

                            {formatRupiah(
                              pesanan.portfolio?.price
                            )}

                          </p>

                          <p className="note-line-item">

                            <strong>
                              Status Pembayaran:
                            </strong>{" "}

                            {isPaid
                              ? "Pembayaran Terverifikasi"
                              : "Belum Dibayar"}

                          </p>

                          <h4 className="note-category-title">
                            DETAIL UKURAN
                          </h4>

                          <p className="note-line-item">
                            {pesanan.body_size_note}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div className="booking-status-wrapper">

                        <span
                          className={`status-badge-premium badge-${bookingStatus}`}
                        >
                          {pesanan.status}
                        </span>

                      </div>

                    </div>

                    {/* ACTION BAR */}

                    <div className="booking-action-bar">

                      {/* MESSAGE */}

                      <div className="action-message">

                        <div className="info-dot"></div>

                        {bookingStatus ===
                          "pending" &&
                          "Pesanan sedang menunggu konfirmasi tailor."}

                        {bookingStatus ===
                          "accepted" &&
                          !isPaid &&
                          "Pesanan diterima. Silakan lakukan pembayaran."}

                        {isPaid &&
                          "Pembayaran telah diverifikasi admin."}

                        {bookingStatus ===
                          "completed" &&
                          "Pesanan telah selesai 🎉"}

                        {bookingStatus ===
                          "cancelled" &&
                          "Pesanan dibatalkan. Silakan pilih ulang tanggal booking atau hapus pesanan."}

                      </div>

                      {/* BUTTONS */}

                      <div className="action-buttons-group">

                        {/* PAYMENT */}

                        {bookingStatus ===
                          "accepted" &&
                          !isPaid && (

                            <button

                              onClick={() =>
                                handlePaymentRedirect(
                                  pesanan
                                )
                              }

                              className="btn-action-primary"
                            >
                              Bayar Sekarang
                            </button>

                          )}

                        {/* CANCELLED */}

                        {bookingStatus ===
                          "cancelled" && (

                            <>

                              {/* EDIT */}

                              <button

                                onClick={() => {

                                  setEditingBookingId(
                                    pesanan.id
                                  );

                                  setSelectedBooking(
                                    pesanan
                                  );

                                  setNewBookingDate(

                                    pesanan.booking_date
                                      ?.split(
                                        "T"
                                      )[0]

                                  );

                                }}

                                className="btn-action-primary"
                              >
                                Pilih Tanggal Baru
                              </button>

                              {/* DELETE */}

                              <button

                                onClick={() =>
                                  handleDeleteBooking(
                                    pesanan.id
                                  )
                                }

                                className="btn-action-secondary"
                              >
                                Hapus Pesanan
                              </button>

                            </>

                          )}

                      </div>

                    </div>

                    {/* INLINE EDIT */}

                    {editingBookingId ===
                      pesanan.id && (

                      <div
                        style={{
                          padding:
                            "20px 24px",
                          borderTop:
                            "1px solid #f0ede4",
                          background:
                            "#fffdf9",
                        }}
                      >

                        <div
                          style={{
                            display:
                              "flex",
                            flexDirection:
                              "column",
                            gap: "14px",
                          }}
                        >

                          <label
                            style={{
                              fontSize:
                                "14px",
                              fontWeight:
                                "600",
                              color:
                                "#333",
                            }}
                          >
                            Pilih tanggal booking baru
                          </label>

                          <input

                            type="date"

                            min={
                              new Date()
                                .toISOString()
                                .split("T")[0]
                            }

                            value={
                              newBookingDate
                            }

                            onChange={(
                              e
                            ) =>

                              setNewBookingDate(
                                e.target
                                  .value
                              )

                            }

                            style={{
                              padding:
                                "12px 14px",
                              borderRadius:
                                "10px",
                              border:
                                "1px solid #ddd",
                              fontSize:
                                "14px",
                              outline:
                                "none",
                            }}
                          />

                          <div
                            style={{
                              display:
                                "flex",
                              gap: "10px",
                            }}
                          >

                            {/* SAVE */}

                            <button

                              onClick={
                                handleUpdateBooking
                              }

                              className="btn-action-primary"
                            >
                              Simpan Perubahan
                            </button>

                            {/* CANCEL */}

                            <button

                              onClick={() => {

                                setEditingBookingId(
                                  null
                                );

                                setSelectedBooking(
                                  null
                                );

                              }}

                              className="btn-action-secondary"
                            >
                              Batal
                            </button>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                );

              }
            )}

          </div>

        )}

      </div>

    </div>

  );

};

export default Booking;