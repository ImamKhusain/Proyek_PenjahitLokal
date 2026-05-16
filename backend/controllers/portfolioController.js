const portfolioModel = require("../models/Portfolio");

// GET ALL PORTFOLIOS
const getAllPortfolios = async (req, res) => {

  try {

    const portfolios =
      await portfolioModel.findAll();

    res.status(200).json({
      message:
        "Portfolios retrieved successfully",

      data: portfolios,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Error retrieving portfolios",

      error: error.message,
    });

  }

};

// GET PORTFOLIO BY TAILOR ID
const getPortfolioByTailorId =
  async (req, res) => {

    try {

      const { tailorId } =
        req.params;

      const portfolios =
        await portfolioModel.findByTailorId(
          tailorId
        );

      res.status(200).json({
        message:
          "Portfolio retrieved successfully",

        data: portfolios,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Error retrieving portfolio",

        error: error.message,
      });

    }

};

// CREATE PORTFOLIO
const createPortfolio = async (req, res) => {

  try {

    const {
      tailor_id,
      description,
      price,
      size,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Error creating portfolio",
        error: "Harap unggah file foto portofolio.",
      });
    }

    const imageUrl = `http://localhost:8080/uploads/catalog/${req.file.filename}`;

    const newPortfolio =
      await portfolioModel.create({

        tailor_id,
        image_url: imageUrl,
        description,
        price: parseInt(price) || 0,
        size,

      });

    res.status(201).json({
      message:
        "Portfolio created successfully",

      data: newPortfolio,
    });

  } catch (error) {

    res.status(400).json({
      message:
        "Error creating portfolio",

      error: error.message,
    });

  }

};

// GET PORTFOLIO BY ID
const getPortfolioById =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const portfolio =
        await portfolioModel.findById(id);

      if (!portfolio) {

        return res.status(404).json({
          message:
            "Portfolio not found",
        });

      }

      res.status(200).json({
        message:
          "Portfolio retrieved successfully",

        data: portfolio,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Error retrieving portfolio",

        error: error.message,
      });

    }

};

// UPDATE PORTFOLIO
const updatePortfolio =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        image_url,
        description,
        price,
        size,
      } = req.body;

      const portfolio =
        await portfolioModel.findById(id);

      if (!portfolio) {

        return res.status(404).json({
          message:
            "Portfolio not found",
        });

      }

      await portfolioModel.updateById(
        id,
        {
          image_url,
          description,
          price: price ? parseInt(price) : undefined,
          size,
        }
      );

      res.status(200).json({
        message:
          "Portfolio updated successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Error updating portfolio",

        error: error.message,
      });

    }

};

// DELETE PORTFOLIO
const deletePortfolio =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const portfolio =
        await portfolioModel.findById(id);

      if (!portfolio) {

        return res.status(404).json({
          message:
            "Portfolio not found",
        });

      }

      await portfolioModel.deleteById(
        id
      );

      res.status(200).json({
        message:
          "Portfolio deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Error deleting portfolio",

        error: error.message,
      });

    }

};

module.exports = {
  getAllPortfolios,
  getPortfolioByTailorId,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};