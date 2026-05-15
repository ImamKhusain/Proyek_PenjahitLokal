const Rating = require("../schema/Rating");
const User = require("../schema/User");
const Tailor = require("../schema/Tailor");

// GET ALL RATINGS
const findAll = async () => {
  return await Rating.findAll({
    include: [
      {
        model: User,
        as: "customer",
        attributes: ["id", "name", "email"],
      },
      {
        model: Tailor,
        attributes: ["id", "specialization"],
      },
    ],
  });
};

// CREATE RATING
const create = async (ratingData) => {
  return await Rating.create(ratingData);
};

// GET RATING BY ID
const findById = async (id) => {
  return await Rating.findByPk(id, {
    include: [
      {
        model: User,
        as: "customer",
        attributes: ["id", "name", "email"],
      },
      {
        model: Tailor,
        attributes: ["id", "specialization"],
      },
    ],
  });
};

// UPDATE RATING
const updateById = async (id, ratingData) => {
  return await Rating.update(ratingData, {
    where: {
      id,
    },
  });
};

// DELETE RATING
const deleteById = async (id) => {
  return await Rating.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};