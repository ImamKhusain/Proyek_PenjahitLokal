const User = require("../schema/User");

// GET ALL USERS
const findAll = async () => {
  return await User.findAll({
    attributes: [
      "id",
      "name",
      "email",
      "role",
    ],
  });
};

// CREATE USER
const create = async (userData) => {
  return await User.create(userData);
};

// GET USER BY ID
const findById = async (id) => {
  return await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "email",
      "role",
    ],
  });
};

// GET USER BY EMAIL
const findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

// UPDATE USER
const updateById = async (id, userData) => {
  return await User.update(userData, {
    where: {
      id,
    },
  });
};

// DELETE USER
const deleteById = async (id) => {
  return await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  findByEmail,
  updateById,
  deleteById,
};