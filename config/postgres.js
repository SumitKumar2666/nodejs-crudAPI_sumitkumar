// Connect to PostgreSQL
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'sSoni@2666', { //db name, db user, db pass
    host: 'localhost',
    dialect: 'postgres',
  });

module.exports = sequelize;
  