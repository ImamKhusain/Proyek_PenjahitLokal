const { Sequelize } =
  require("sequelize");

require("dotenv").config();


// =====================================
// CHECK CLOUD SQL
// =====================================

const isCloudRun =

  process.env.DB_HOST?.includes(
    "/cloudsql/"
  );


// =====================================
// SEQUELIZE
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
      // CLOUD RUN
      // =====================================

      ...(isCloudRun

        ? {

            host: "localhost",

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