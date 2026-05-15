const express = require("express");

const router = express.Router();

const {
  getAllPayments,
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET ALL PAYMENTS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllPayments
);

// GET PAYMENT BY ID
router.get(
  "/:id",
  authMiddleware,
  getPaymentById
);

// CREATE PAYMENT
router.post(
  "/",
  authMiddleware,
  createPayment
);

// UPDATE PAYMENT
router.put(
  "/:id",
  authMiddleware,
  updatePayment
);

// DELETE PAYMENT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePayment
);

module.exports = router;