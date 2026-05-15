const express = require("express");

const router = express.Router();

const {
  getAllPortfolios,
  getPortfolioByTailorId,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

// GET ALL PORTFOLIOS
router.get(
  "/",
  getAllPortfolios
);

// GET PORTFOLIO BY TAILOR ID
router.get(
  "/tailor/:tailorId",
  getPortfolioByTailorId
);

// GET PORTFOLIO BY ID
router.get(
  "/:id",
  getPortfolioById
);

// CREATE PORTFOLIO
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createPortfolio
);

// UPDATE PORTFOLIO
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updatePortfolio
);

// DELETE PORTFOLIO
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePortfolio
);

module.exports = router;