const express = require("express");

const router = express.Router();

const {
  getAllRatings,
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
} = require("../controllers/ratingController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET ALL RATINGS
router.get("/", getAllRatings);

// GET RATING BY ID
router.get("/:id", authMiddleware, getRatingById);

// CREATE RATING
router.post(
  "/",
  authMiddleware,
  createRating
);

// UPDATE RATING
router.put(
  "/:id",
  authMiddleware,
  updateRating
);

// DELETE RATING
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteRating
);

module.exports = router;