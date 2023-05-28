const Sequalize = require("sequelize");

const sequelize = new Sequalize("rest-api-db", "root", "mario123", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
});

module.exports = sequelize;
