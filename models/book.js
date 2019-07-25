const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Book extends Sequelize.Model {}

Book.init({
  name: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { sequelize, modelName: 'books' });

module.exports = Book;