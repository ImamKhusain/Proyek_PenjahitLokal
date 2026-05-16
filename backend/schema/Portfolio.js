const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/database");

const Tailor =
  require("./Tailor");

const Portfolio =
  sequelize.define(
    "Portfolio",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      tailor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      size: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "portfolios",
      timestamps: false,
    }
  );

// RELATION
Portfolio.belongsTo(Tailor, {
  foreignKey: "tailor_id",
});

Tailor.hasMany(Portfolio, {
  foreignKey: "tailor_id",
});

module.exports = Portfolio;