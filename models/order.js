const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Op } = require('sequelize');

const order = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalfee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Pre-save hook to check for pre-existing order within 3 hours
order.beforeSave(async (nOrder) => {
  // Check if there is a pre-existing order within 3 hours of the specified datetime
  if (nOrder._previousDataValues || nOrder.isNewRecord) {
    const threeHoursAgo = new Date(nOrder.dataValues.datetime);
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
    const preExistingOrder = await order.findOne({
      where: {
        datetime: {
          [Op.between]: [new Date(threeHoursAgo), new Date(nOrder.dataValues.datetime)]
        },
      },
    });
    if (preExistingOrder) {
      throw new Error('Cannot create or update order within 3 hours of a pre-existing order.');
    }
  }
});


module.exports = order;