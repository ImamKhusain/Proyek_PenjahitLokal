//routes 
const express =
  require("express");

const router =
  express.Router();

const {

  getAllPayments,

  createPayment,

  getPaymentById,

  updatePayment,

  updatePaymentStatus,

  deletePayment,

} = require(
  "../controllers/paymentController"
);

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const upload =
  require("../middleware/uploadMiddleware");


// =====================================
// GET ALL PAYMENTS
// ADMIN ONLY
// =====================================

router.get(

  "/",

  authMiddleware,

  // adminMiddleware,

  getAllPayments

);


// =====================================
// GET PAYMENT BY ID
// =====================================

router.get(

  "/:id",

  authMiddleware,

  getPaymentById

);


// =====================================
// CREATE PAYMENT
// =====================================

router.post(

  "/",

  authMiddleware,

  upload.firebase.single(
    "payment_proof"
  ),

  createPayment

);


// =====================================
// UPDATE PAYMENT
// =====================================

router.put(

  "/:id",

  authMiddleware,

  upload.firebase.single(
    "payment_proof"
  ),

  updatePayment

);


// =====================================
// UPDATE PAYMENT STATUS
// ADMIN ONLY
// =====================================

router.patch(

  "/:id/status",

  authMiddleware,

  adminMiddleware,

  updatePaymentStatus

);


// =====================================
// DELETE PAYMENT
// ADMIN ONLY
// =====================================

router.delete(

  "/:id",

  authMiddleware,

  adminMiddleware,

  deletePayment

);


module.exports = router;