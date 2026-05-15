const express = require("express");

const router = express.Router();

const {
  getAllTailors,
  createTailor,
  getTailorById,
  updateTailor,
  deleteTailor,
} = require("../controllers/tailorController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET ALL TAILORS
router.get("/", getAllTailors);

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