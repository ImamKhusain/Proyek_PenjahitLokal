// controller

const paymentModel =
  require("../models/Payment");

const firebaseService =
  require("../services/firebaseService");

const {
  createPaymentNotification,
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


      // =====================================
      // VALIDASI FILE
      // =====================================

      if (!req.file) {

        return res.status(400).json({

          message:
            "Bukti pembayaran wajib diupload",

        });

      }


      // =====================================
      // UPLOAD KE FIREBASE STORAGE
      // =====================================

      const uploadResult =
        await firebaseService
          .uploadPaymentProof(

            req.file,

            booking_id,

            req.user?.id || null

          );


      // ambil url gambar
      const paymentProofUrl =
        uploadResult.image_url;


      // =====================================
      // SIMPAN KE MYSQL
      // =====================================

      const newPayment =
        await paymentModel
          .create({

            booking_id,

            payment_method,

            amount,

            payment_status:
              "pending",

            payment_proof:
              paymentProofUrl,

          });


      // =====================================
      // SIMPAN KE FIRESTORE
      // =====================================

      await firebaseService
        .savePaymentToFirestore({

          booking_id,

          customer_id:
            req.user?.id || null,

          image_url:
            paymentProofUrl,

          status:
            "pending",

        });


      // =====================================
      // CREATE NOTIFICATION
      // =====================================

      await createPaymentNotification({

        user_id:
          req.user?.id,

        booking_id,

        payment_status:
          "pending",

      });


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

        data:
          payment,

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

              req.user?.id || null

            );

        paymentProofUrl =
          uploadResult.image_url;

      }


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
      // CREATE NOTIFICATION
      // =====================================

      if (payment_status) {

        await createPaymentNotification({

          user_id:
            req.user?.id,

          booking_id:
            payment.booking_id,

          payment_status,

        });

      }


      res.status(200).json({

        message:
          "Payment updated successfully",

      });

    } catch (error) {

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

      const payment =
        await paymentModel
          .findById(id);

      await paymentModel
        .updateStatus(
          id,
          payment_status
        );


      // =====================================
      // CREATE NOTIFICATION
      // =====================================

      await createPaymentNotification({

        user_id:
          req.user?.id,

        booking_id:
          payment.booking_id,

        payment_status,

      });


      res.status(200).json({

        message:
          "Payment status updated",

      });

    } catch (error) {

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