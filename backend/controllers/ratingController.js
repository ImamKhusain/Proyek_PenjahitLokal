const ratingModel = require("../models/Rating");

// GET ALL RATINGS
const getAllRatings = async (req, res) => {
  try {

    const ratings = await ratingModel.findAll();

    res.status(200).json({
      message: "Ratings retrieved successfully",
      data: ratings,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error retrieving ratings",
      error: error.message,
    });

  }
};

// CREATE RATING
const createRating = async (req, res) => {
  try {

    const {
      customer_id,
      tailor_id,
      rating,
      review,
    } = req.body;

    const newRating = await ratingModel.create({
      customer_id,
      tailor_id,
      rating,
      review,
    });

    res.status(201).json({
      message: "Rating created successfully",
      data: newRating,
    });

  } catch (error) {

    res.status(400).json({
      message: "Error creating rating",
      error: error.message,
    });

  }
};

// GET RATING BY ID
const getRatingById = async (req, res) => {
  try {

    const { id } = req.params;

    const rating = await ratingModel.findById(id);

    if (!rating) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    res.status(200).json({
      message: "Rating retrieved successfully",
      data: rating,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error retrieving rating",
      error: error.message,
    });

  }
};

// UPDATE RATING
const updateRating = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      rating,
      review,
    } = req.body;

    const ratingData = await ratingModel.findById(id);

    if (!ratingData) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    await ratingModel.updateById(id, {
      rating,
      review,
    });

    res.status(200).json({
      message: "Rating updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error updating rating",
      error: error.message,
    });

  }
};

// DELETE RATING
const deleteRating = async (req, res) => {
  try {

    const { id } = req.params;

    const ratingData = await ratingModel.findById(id);

    if (!ratingData) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    await ratingModel.deleteById(id);

    res.status(200).json({
      message: "Rating deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting rating",
      error: error.message,
    });

  }
};

module.exports = {
  getAllRatings,
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
};