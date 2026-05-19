// backend/services/notificationService.js

const db =
  require("../config/firestore");

const {
  addDoc,
  collection,
} = require(
  "firebase/firestore"
);


// =========================
// NOTIF CHAT BARU
// =========================

const createChatNotification =
  async ({
    user_id,
    sender_name,
    room_id,
  }) => {

    try {

      await addDoc(

        collection(
          db,
          "notifications"
        ),

        {
          user_id,

          type: "chat",

          title:
            "Pesan Baru",

          message:
            `${sender_name} mengirim pesan baru`,

          redirect_url:
            `/admin-chat/${room_id}`,

          is_read: false,

          created_at:
            new Date(),
        }

      );

    } catch (error) {

      console.log(
        "CHAT NOTIF ERROR:",
        error
      );

    }

  };


// =========================
// NOTIF PAYMENT
// =========================

const createPaymentNotification =
  async ({
    user_id,
    booking_id,
    payment_status,
  }) => {

    try {

      await addDoc(

        collection(
          db,
          "notifications"
        ),

        {
          user_id,

          booking_id,

          type: "payment",

          title:
            "Status Pembayaran",

          message:
            `Pembayaran booking #${booking_id} ${payment_status}`,

          redirect_url:
            `/booking/${booking_id}`,

          is_read: false,

          created_at:
            new Date(),
        }

      );

    } catch (error) {

      console.log(
        "PAYMENT NOTIF ERROR:",
        error
      );

    }

  };


// =========================
// NOTIF BOOKING
// =========================

const createBookingNotification =
  async ({
    user_id,
    booking_id,
    booking_status,
  }) => {

    try {

      await addDoc(

        collection(
          db,
          "notifications"
        ),

        {
          user_id,

          booking_id,

          type: "booking",

          title:
            "Update Pesanan",

          message:
            `Pesanan booking #${booking_id} ${booking_status}`,

          redirect_url:
            `/booking/${booking_id}`,

          is_read: false,

          created_at:
            new Date(),
        }

      );

    } catch (error) {

      console.log(
        "BOOKING NOTIF ERROR:",
        error
      );

    }

  };


// =========================
// EXPORT
// =========================

module.exports = {

  createChatNotification,

  createPaymentNotification,

  createBookingNotification,

};