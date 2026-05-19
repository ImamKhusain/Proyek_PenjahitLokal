//model
const Payment =
  require("../schema/Payment");

const Booking =
  require("../schema/Booking");


// =====================================
// GET ALL PAYMENTS
// =====================================

const findAll = async () => {

  return await Payment.findAll({

    include: [

      {
        model: Booking,

        attributes: [
          "id",
          "booking_date",
          "status",
        ],
      },

    ],

    order: [
      ["created_at", "DESC"],
    ],

  });

};


// =====================================
// CREATE PAYMENT
// =====================================

const create = async (
  paymentData
) => {

  return await Payment.create({

    booking_id:
      paymentData.booking_id,

    payment_method:
      paymentData.payment_method,

    amount:
      paymentData.amount,

    payment_status:
      paymentData.payment_status
      || "pending",

    payment_proof:
      paymentData.payment_proof,

  });

};


// =====================================
// GET PAYMENT BY ID
// =====================================

const findById = async (
  id
) => {

  return await Payment.findByPk(

    id,

    {

      include: [

        {
          model: Booking,

          attributes: [
            "id",
            "booking_date",
            "status",
          ],

        },

      ],

    }

  );

};


// =====================================
// UPDATE PAYMENT
// =====================================

const updateById = async (
  id,
  paymentData
) => {

  return await Payment.update(

    {

      payment_method:
        paymentData.payment_method,

      amount:
        paymentData.amount,

      payment_status:
        paymentData.payment_status,

      payment_proof:
        paymentData.payment_proof,

    },

    {

      where: {
        id,
      },

    }

  );

};


// =====================================
// UPDATE PAYMENT STATUS
// =====================================

const updateStatus = async (
  id,
  payment_status
) => {

  return await Payment.update(

    {
      payment_status,
    },

    {

      where: {
        id,
      },

    }

  );

};


// =====================================
// DELETE PAYMENT
// =====================================

const deleteById = async (
  id
) => {

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

  updateStatus,

  deleteById,

};