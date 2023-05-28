// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     min: 6,
//   },
//   email: {
//     type: String,
//     required: true,
//     max: 255,
//     min: 6,
//   },
//   password: {
//     type: String,
//     required: true,
//     max: 1024,
//     min: 6,
//   },
//   role: {
//     type: String,
//     required: true,
//     max: 255,
//     min: 6,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("User", userSchema);

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
