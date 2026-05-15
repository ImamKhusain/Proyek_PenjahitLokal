const tailorModel = require("../models/Tailor");

// GET ALL TAILORS
const getAllTailors = async (req, res) => {
  try {

    const tailors = await tailorModel.findAll();

    res.status(200).json({
      message: "Tailors retrieved successfully",
      data: tailors,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error retrieving tailors",
      error: error.message,
    });

  }
};

// CREATE TAILOR
const createTailor = async (req, res) => {
  try {

    const {
      user_id,
      specialization,
      description,
      address,
      phone,
    } = req.body;

    const newTailor = await tailorModel.create({
      user_id,
      specialization,
      description,
      address,
      phone,
    });

    res.status(201).json({
      message: "Tailor created successfully",
      data: newTailor,
    });

  } catch (error) {

    res.status(400).json({
      message: "Error creating tailor",
      error: error.message,
    });

  }
};

// GET TAILOR BY ID
const getTailorById = async (req, res) => {
  try {

    const { id } = req.params;

    const tailor = await tailorModel.findById(id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    res.status(200).json({
      message: "Tailor retrieved successfully",
      data: tailor,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error retrieving tailor",
      error: error.message,
    });

  }
};

// UPDATE TAILOR
const updateTailor = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      specialization,
      description,
      address,
      phone,
    } = req.body;

    const tailor = await tailorModel.findById(id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    await tailorModel.updateById(id, {
      specialization,
      description,
      address,
      phone,
    });

    res.status(200).json({
      message: "Tailor updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error updating tailor",
      error: error.message,
    });

  }
};

// DELETE TAILOR
const deleteTailor = async (req, res) => {
  try {

    const { id } = req.params;

    const tailor = await tailorModel.findById(id);

    if (!tailor) {
      return res.status(404).json({
        message: "Tailor not found",
      });
    }

    await tailorModel.deleteById(id);

    res.status(200).json({
      message: "Tailor deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting tailor",
      error: error.message,
    });

  }
};

module.exports = {
  getAllTailors,
  createTailor,
  getTailorById,
  updateTailor,
  deleteTailor,
};