const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const service = sequelize.define('services', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = service;