const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Publisher extends Sequelize.Model {}

Publisher.init({
  name: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { sequelize, modelName: 'publisher' });

module.exports = Publisher;