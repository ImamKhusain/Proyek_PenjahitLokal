const Booking = require("../schema/Booking");
const User = require("../schema/User");
const Tailor = require("../schema/Tailor");

// GET ALL BOOKINGS
const findAll = async () => {
  return await Booking.findAll({
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

// CREATE BOOKING
const create = async (bookingData) => {
  return await Booking.create(bookingData);
};

// GET BOOKING BY ID
const findById = async (id) => {
  return await Booking.findByPk(id, {
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

// UPDATE BOOKING
const updateById = async (id, bookingData) => {
  return await Booking.update(bookingData, {
    where: {
      id,
    },
  });
};

// DELETE BOOKING
const deleteById = async (id) => {
  return await Booking.destroy({
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