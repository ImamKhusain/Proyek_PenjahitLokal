const express = require("express");

const router = express.Router();

const {
  getAllTailors,
  getMyTailor,
  createTailor,
  getTailorById,
  updateTailor,
  deleteTailor,
} = require("../controllers/tailorController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

// GET ALL TAILORS
router.get("/", getAllTailors);

// GET MY TAILOR
router.get(
  "/me",
  authMiddleware,
  adminMiddleware,
  getMyTailor
);

// GET TAILOR BY ID
router.get("/:id", getTailorById);

// CREATE TAILOR
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTailor
);

// UPDATE TAILOR
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTailor
);

// DELETE TAILOR
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTailor
);

module.exports = router;