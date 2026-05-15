const Tailor = require("../schema/Tailor");
const User = require("../schema/User");

// GET ALL TAILORS
const findAll = async () => {
  return await Tailor.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

// CREATE TAILOR
const create = async (tailorData) => {
  return await Tailor.create(tailorData);
};

// GET TAILOR BY ID
const findById = async (id) => {
  return await Tailor.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

// UPDATE TAILOR
const updateById = async (id, tailorData) => {
  return await Tailor.update(tailorData, {
    where: {
      id,
    },
  });
};

// DELETE TAILOR
const deleteById = async (id) => {
  return await Tailor.destroy({
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