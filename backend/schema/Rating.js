const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Tailor = require("./Tailor");

const Rating = sequelize.define(
  "Rating",
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

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    review: {
      type: DataTypes.TEXT,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "ratings",
    timestamps: false,
  }
);

// RELATION
Rating.belongsTo(User, {
  foreignKey: "customer_id",
  as: "customer",
});

User.hasMany(Rating, {
  foreignKey: "customer_id",
  as: "ratings",
});

Rating.belongsTo(Tailor, {
  foreignKey: "tailor_id",
});

Tailor.hasMany(Rating, {
  foreignKey: "tailor_id",
});

module.exports = Rating;