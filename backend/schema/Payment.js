//schema
const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/database");

const Booking =
  require("./Booking");


const Payment =
  sequelize.define(

    "Payment",

    {

      id: {
        type:
          DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,
      },


      booking_id: {
        type:
          DataTypes.INTEGER,

        allowNull: false,
      },


      payment_method: {
        type:
          DataTypes.STRING,

        allowNull: false,
      },


      amount: {
        type:
          DataTypes.DECIMAL(10, 2),

        allowNull: false,
      },


      payment_status: {

        type:
          DataTypes.ENUM(

            "pending",
            "paid",
            "rejected"

          ),

        defaultValue:
          "pending",

      },


      payment_proof: {
        type:
          DataTypes.TEXT,
      },


      created_at: {

        type:
          DataTypes.DATE,

        defaultValue:
          DataTypes.NOW,

      },

    },

    {

      tableName:
        "payments",

      timestamps: false,

    }

);


// RELATION

Payment.belongsTo(
  Booking,
  {
    foreignKey:
      "booking_id",
  }
);

Booking.hasMany(
  Payment,
  {
    foreignKey:
      "booking_id",
  }
);


module.exports =
  Payment;