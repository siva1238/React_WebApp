// const mysql= require('mysql2');

// const pool = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     database:'node_complete',
//     password:'admin'
// })

// module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("case_study_one", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
