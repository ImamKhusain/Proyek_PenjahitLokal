const paymentModel =
  require("../models/Payment");

const Booking =
  require("../schema/Booking");

const Tailor =
  require("../schema/Tailor");

const firebaseService =
  require("../services/firebaseService");

const {

  createPaymentNotification,

  createAdminPaymentNotification,

} = require(
  "../services/notificationService"
);


// =====================================
// GET ALL PAYMENTS
// =====================================

const getAllPayments =
  async (req, res) => {

    try {

      const payments =
        await paymentModel
          .findAll();

      // =====================================
      // CUSTOMER HANYA LIHAT MILIKNYA
      // =====================================

      if (
        req.user.role !==
        "admin"
      ) {

        const filteredPayments =
          payments.filter(
            (payment) =>

              payment.Booking
                ?.customer_id ===
              req.user.id
          );

        return res.status(200).json({

          message:
            "Payments retrieved successfully",

          data:
            filteredPayments,

        });

      }

      // =====================================
      // ADMIN LIHAT SEMUA
      // =====================================

      res.status(200).json({

        message:
          "Payments retrieved successfully",

        data: payments,

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error retrieving payments",

        error:
          error.message,

      });

    }

};


// =====================================
// CREATE PAYMENT
// =====================================

const createPayment =
  async (req, res) => {

    try {

      const {

        booking_id,

        payment_method,

        amount,

      } = req.body;

      let paymentProofUrl =
        null;

      // =====================================
      // UPLOAD FIREBASE
      // =====================================

      if (req.file) {

        const uploadResult =
          await firebaseService
            .uploadPaymentProof(

              req.file,

              booking_id,

              req.user?.id

            );

        paymentProofUrl =
          uploadResult.imageurl;

      }

      // =====================================
      // CREATE PAYMENT MYSQL
      // =====================================

      const newPayment =
        await paymentModel
          .create({

            booking_id,

            payment_method,

            amount,

            payment_proof:
              paymentProofUrl,

          });

      // =====================================
      // GET BOOKING
      // =====================================

      const booking =
        await Booking.findByPk(
          booking_id
        );

      // =====================================
      // ADMIN NOTIFICATION
      // =====================================

      if (booking) {

        // GET TAILOR
        const tailor =
          await Tailor.findByPk(
            booking.tailor_id
          );

        // SEND NOTIF
        if (tailor) {

          await createAdminPaymentNotification({

            user_id:
              tailor.user_id,

            booking_id,

            payment_status:
              "pembayaran masuk",

          });

        }

      }

      // =====================================
      // CUSTOMER NOTIFICATION
      // =====================================

      await createPaymentNotification({

        user_id:
          req.user.id,

        booking_id,

        payment_status:
          "berhasil dilakukan",

      });

      // =====================================
      // RESPONSE
      // =====================================

      res.status(201).json({

        message:
          "Payment created successfully",

        data:
          newPayment,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error creating payment",

        error:
          error.message,

      });

    }

};


// =====================================
// GET PAYMENT BY ID
// =====================================

const getPaymentById =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const payment =
        await paymentModel
          .findById(id);

      if (!payment) {

        return res.status(404).json({

          message:
            "Payment not found",

        });

      }

      res.status(200).json({

        message:
          "Payment retrieved successfully",

        data: payment,

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error retrieving payment",

        error:
          error.message,

      });

    }

};


// =====================================
// UPDATE PAYMENT
// =====================================

const updatePayment =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const payment =
        await paymentModel
          .findById(id);

      if (!payment) {

        return res.status(404).json({

          message:
            "Payment not found",

        });

      }

      const {

        payment_method,

        amount,

        payment_status,

      } = req.body;

      let paymentProofUrl =
        payment.payment_proof;

      // =====================================
      // UPLOAD BUKTI BARU
      // =====================================

      if (req.file) {

        const uploadResult =
          await firebaseService
            .uploadPaymentProof(

              req.file,

              payment.booking_id,

              req.user?.id

            );

        paymentProofUrl =
          uploadResult.imageurl;

      }

      // =====================================
      // UPDATE MYSQL
      // =====================================

      await paymentModel
        .updateById(

          id,

          {

            payment_method,

            amount,

            payment_status,

            payment_proof:
              paymentProofUrl,

          }

        );

      // =====================================
      // NOTIFICATION KE CUSTOMER
      // =====================================

      if (payment_status) {

        const booking =
          await Booking.findByPk(
            payment.booking_id
          );

        if (booking) {

          await createPaymentNotification({

            user_id:
              booking.customer_id,

            booking_id:
              payment.booking_id,

            payment_status,

          });

        }

      }

      res.status(200).json({

        message:
          "Payment updated successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error updating payment",

        error:
          error.message,

      });

    }

};


// =====================================
// UPDATE PAYMENT STATUS
// =====================================

const updatePaymentStatus =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        payment_status,
      } = req.body;

      // PAYMENT
      const payment =
        await paymentModel
          .findById(id);

      if (!payment) {

        return res.status(404).json({

          message:
            "Payment not found",

        });

      }

      // BOOKING
      const booking =
        await Booking.findByPk(
          payment.booking_id
        );

      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found",

        });

      }

      // UPDATE STATUS
      await paymentModel
        .updateStatus(
          id,
          payment_status
        );

      // =====================================
      // NOTIF CUSTOMER
      // =====================================

      await createPaymentNotification({

        user_id:
          booking.customer_id,

        booking_id:
          payment.booking_id,

        payment_status,

      });

      res.status(200).json({

        message:
          "Payment status updated",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error update payment status",

        error:
          error.message,

      });

    }

};


// =====================================
// DELETE PAYMENT
// =====================================

const deletePayment =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const payment =
        await paymentModel
          .findById(id);

      if (!payment) {

        return res.status(404).json({

          message:
            "Payment not found",

        });

      }

      await paymentModel
        .deleteById(id);

      res.status(200).json({

        message:
          "Payment deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Error deleting payment",

        error:
          error.message,

      });

    }

};


module.exports = {

  getAllPayments,

  createPayment,

  getPaymentById,

  updatePayment,

  updatePaymentStatus,

  deletePayment,

};