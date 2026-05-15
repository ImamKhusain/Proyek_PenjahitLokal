const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");

const Tailor = sequelize.define(
  "Tailor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    address: {
      type: DataTypes.TEXT,
    },

    phone: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "tailors",
    timestamps: false,
  }
);

// RELATION
Tailor.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Tailor, {
  foreignKey: "user_id",
});

module.exports = Tailor;