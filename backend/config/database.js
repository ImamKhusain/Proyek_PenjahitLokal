const { Sequelize } =
  require("sequelize");

require("dotenv").config();


// =====================================
// CLOUD SQL SOCKET CHECK
// =====================================

const isCloudSQL =

  process.env.DB_HOST?.startsWith(
    "/cloudsql/"
  );


// =====================================
// SEQUELIZE CONFIG
// =====================================

const sequelize =
  new Sequelize(

    process.env.DB_NAME,

    process.env.DB_USER,

    process.env.DB_PASS,

    {

      dialect: "mysql",

      logging: false,


      // =====================================
      // LOCALHOST
      // =====================================

      ...(isCloudSQL

        ? {

            dialectOptions: {

              socketPath:
                process.env.DB_HOST,

            },

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