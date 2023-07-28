const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const order = require('./order');
const service = require('./service');

const orderService = sequelize.define('order_services', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  timestamps: true,
});

// Add the foreign keys
orderService.belongsTo(order, { foreignKey: 'orderId' });
orderService.belongsTo(service, { foreignKey: 'serviceId' });

order.hasMany(orderService, { foreignKey: 'orderId' });
service.hasMany(orderService, { foreignKey: 'serviceId' });

module.exports = orderService;