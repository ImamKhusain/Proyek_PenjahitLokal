const Payment = require("../schema/Payment");
const Booking = require("../schema/Booking");

// GET ALL PAYMENTS
const findAll = async () => {
  return await Payment.findAll({
    include: [
      {
        model: Booking,
        attributes: ["id", "booking_date", "status"],
      },
    ],
  });
};

// CREATE PAYMENT
const create = async (paymentData) => {
  return await Payment.create(paymentData);
};

// GET PAYMENT BY ID
const findById = async (id) => {
  return await Payment.findByPk(id, {
    include: [
      {
        model: Booking,
        attributes: ["id", "booking_date", "status"],
      },
    ],
  });
};

// UPDATE PAYMENT
const updateById = async (id, paymentData) => {
  return await Payment.update(paymentData, {
    where: {
      id,
    },
  });
};

// DELETE PAYMENT
const deleteById = async (id) => {
  return await Payment.destroy({
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