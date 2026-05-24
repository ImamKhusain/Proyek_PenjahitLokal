const { Sequelize } =
  require("sequelize");

require("dotenv").config();

const isCloudRun =
  process.env.DB_HOST?.startsWith(
    "/cloudsql/"
  );

const sequelize =
  new Sequelize(

    process.env.DB_NAME,

    process.env.DB_USER,

    process.env.DB_PASS,

    {

      dialect: "mysql",

      logging: false,

      ...(isCloudRun

        ? {

            socketPath:
              process.env.DB_HOST,

          }

        : {

            host:
              process.env.DB_HOST,

            port:
              process.env.DB_PORT,

          }),

    }

  );

module.exports =
  sequelize;