const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

const user = require('../models/user');
const books = require('../models/book');

class Order extends Sequelize.Model {}

Order.init({
  name: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { sequelize, modelName: 'orders' });

Order.belongsTo(user);
Order.belongsTo(books);

module.exports = Order;