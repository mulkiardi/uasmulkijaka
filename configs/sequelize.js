const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/uasmulkijaka');

module.exports = sequelize;