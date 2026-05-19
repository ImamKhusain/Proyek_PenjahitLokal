const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Tailor = require("./Tailor");
const Portfolio = require("./Portfolio");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    tailor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    portfolio_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending",
    },

    body_size_note: {
      type: DataTypes.TEXT,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bookings",
    timestamps: false,
  }
);

// RELATION
Booking.belongsTo(User, {
  foreignKey: "customer_id",
  as: "customer",
});

User.hasMany(Booking, {
  foreignKey: "customer_id",
  as: "bookings",
});

Booking.belongsTo(Tailor, {
  foreignKey: "tailor_id",
});

Tailor.hasMany(Booking, {
  foreignKey: "tailor_id",
});

// 🚀 3. Relasi Portfolio di File Schema
Booking.belongsTo(Portfolio, { foreignKey: "portfolio_id", as: "portfolio" });
Portfolio.hasMany(Booking, { foreignKey: "portfolio_id" });

module.exports = Booking;