const express = require("express");

const router = express.Router();

const {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET ALL BOOKINGS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllBookings
);

// GET BOOKING BY ID
router.get(
  "/:id",
  authMiddleware,
  getBookingById
);

// CREATE BOOKING
router.post(
  "/",
  authMiddleware,
  createBooking
);

// UPDATE BOOKING
router.put(
  "/:id",
  authMiddleware,
  updateBooking
);

// DELETE BOOKING
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteBooking
);

module.exports = router;