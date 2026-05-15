const Portfolio = require("../schema/Portfolio");
const Tailor = require("../schema/Tailor");

// GET ALL PORTFOLIOS
const findAll = async () => {
  return await Portfolio.findAll({
    include: [
      {
        model: Tailor,
        attributes: ["id", "specialization"],
      },
    ],
  });
};

// CREATE PORTFOLIO
const create = async (portfolioData) => {
  return await Portfolio.create(portfolioData);
};

// GET PORTFOLIO BY ID
const findById = async (id) => {
  return await Portfolio.findByPk(id, {
    include: [
      {
        model: Tailor,
        attributes: ["id", "specialization"],
      },
    ],
  });
};

// UPDATE PORTFOLIO
const updateById = async (id, portfolioData) => {
  return await Portfolio.update(portfolioData, {
    where: {
      id,
    },
  });
};

// DELETE PORTFOLIO
const deleteById = async (id) => {
  return await Portfolio.destroy({
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