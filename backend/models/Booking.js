const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/database");

// IMPORT DARI FOLDER SCHEMA
const User =
  require("../schema/User");

const Tailor =
  require("../schema/Tailor");

const Booking =
  sequelize.define(
    "Booking",
    {
      id: {
        type:
          DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,
      },

      customer_id: {
        type:
          DataTypes.INTEGER,

        allowNull: false,
      },

      tailor_id: {
        type:
          DataTypes.INTEGER,

        allowNull: false,
      },

      booking_date: {
        type:
          DataTypes.DATE,

        allowNull: false,
      },

      status: {
        type:
          DataTypes.ENUM(
            "pending",
            "accepted",
            "completed",
            "cancelled"
          ),

        defaultValue:
          "pending",
      },

      body_size_note: {
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
        "bookings",

      timestamps: false,
    }
  );

// =====================
// RELATION CUSTOMER
// =====================

Booking.belongsTo(User, {
  foreignKey:
    "customer_id",

  as: "customer",
});

User.hasMany(Booking, {
  foreignKey:
    "customer_id",

  as:
    "customerBookings",
});

// =====================
// RELATION TAILOR
// =====================

Booking.belongsTo(Tailor, {
  foreignKey:
    "tailor_id",

  as: "tailor",
});

Tailor.hasMany(Booking, {
  foreignKey:
    "tailor_id",

  as:
    "tailorBookings",
});

module.exports =
  Booking;