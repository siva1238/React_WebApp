const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  // define user model
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: Sequelize.STRING,
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  age: Sequelize.INTEGER,
});

module.exports = User;
