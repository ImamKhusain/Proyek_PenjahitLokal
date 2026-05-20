// backend/services/notificationService.js

const db =
  require("../config/firestore");

const {
  addDoc,
  collection,
} = require(
  "firebase/firestore"
);


// =====================================
// CUSTOMER COLLECTION
// =====================================

const CUSTOMER_NOTIFICATION =
  "notifications";


// =====================================
// ADMIN COLLECTION
// =====================================

const ADMIN_NOTIFICATION =
  "admin_notifications";


// =====================================
// CHAT CUSTOMER
// =====================================

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
          CUSTOMER_NOTIFICATION
        ),

        {

          user_id,

          type:
            "chat",

          title:
            "Pesan Baru",

          message:
            `${sender_name} mengirim pesan baru`,

          redirect_url:
            `/chat/${room_id}`,

          is_read:
            false,

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


// =====================================
// CHAT ADMIN
// =====================================

const createAdminChatNotification =
  async ({

    user_id,

    sender_name,

    room_id,

  }) => {

    try {

      await addDoc(

        collection(
          db,
          ADMIN_NOTIFICATION
        ),

        {

          user_id,

          type:
            "chat",

          title:
            "Pesan Baru",

          message:
            `${sender_name} mengirim pesan baru`,

          redirect_url:
            `/admin-chat/${room_id}`,

          is_read:
            false,

          created_at:
            new Date(),

        }

      );

    } catch (error) {

      console.log(
        "ADMIN CHAT NOTIF ERROR:",
        error
      );

    }

  };


// =====================================
// PAYMENT CUSTOMER
// =====================================

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
          CUSTOMER_NOTIFICATION
        ),

        {

          user_id,

          booking_id,

          type:
            "payment",

          title:
            "Status Pembayaran",

          message:
            `Pembayaran booking #${booking_id} ${payment_status}`,

          redirect_url:
            `/booking/${booking_id}`,

          is_read:
            false,

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


// =====================================
// PAYMENT ADMIN
// =====================================

const createAdminPaymentNotification =
  async ({

    user_id,

    booking_id,

    payment_status,

  }) => {

    try {

      await addDoc(

        collection(
          db,
          ADMIN_NOTIFICATION
        ),

        {

          user_id,

          booking_id,

          type:
            "payment",

          title:
            "Pembayaran Baru",

          message:
            `Pembayaran booking #${booking_id} ${payment_status}`,

          redirect_url:
            `/booking/${booking_id}`,

          is_read:
            false,

          created_at:
            new Date(),

        }

      );

    } catch (error) {

      console.log(
        "ADMIN PAYMENT NOTIF ERROR:",
        error
      );

    }

  };


// =====================================
// BOOKING CUSTOMER
// =====================================

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
          CUSTOMER_NOTIFICATION
        ),

        {

          user_id,

          booking_id,

          type:
            "booking",

          title:
            "Update Pesanan",

          message:
            `Pesanan booking #${booking_id} ${booking_status}`,

          redirect_url:
            `/booking/${booking_id}`,

          is_read:
            false,

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


// =====================================
// BOOKING ADMIN
// =====================================

const createAdminBookingNotification =
  async ({

    user_id,

    booking_id,

    booking_status,

  }) => {

    try {

      await addDoc(

        collection(
          db,
          ADMIN_NOTIFICATION
        ),

        {

          user_id,

          booking_id,

          type:
            "booking",

          title:
            "Pesanan Baru",

          message:
            `Booking #${booking_id} ${booking_status}`,

          redirect_url:
            `/booking/${booking_id}`,

          is_read:
            false,

          created_at:
            new Date(),

        }

      );

    } catch (error) {

      console.log(
        "ADMIN BOOKING NOTIF ERROR:",
        error
      );

    }

  };


// =====================================
// EXPORT
// =====================================

module.exports = {

  // CUSTOMER
  createChatNotification,
  createPaymentNotification,
  createBookingNotification,

  // ADMIN
  createAdminChatNotification,
  createAdminPaymentNotification,
  createAdminBookingNotification,

};