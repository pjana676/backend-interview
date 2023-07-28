const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db');
require('../models/service');
require('../models/order');
require('../models/orderService');

'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await sequelize.sync(
      {force: false}
    );
    // Read data from services.json
    const servicesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'services.json'), 'utf-8'));

    // Read data from orders.json
    const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'orders.json'), 'utf-8'));


    try {
      await queryInterface.bulkInsert('services', servicesData.map((e) => {
        return { ...e, createdAt: new Date(),  updatedAt: new Date() } 
      }), 
      {});
    } catch(err) {
      console.log(err);
    }
    try {
      await queryInterface.bulkInsert('orders', ordersData.map((e) => {
        let nObj = { ...e, createdAt: new Date(),  updatedAt: new Date() };
        delete nObj.services;
        return nObj; 
      }));
    } catch(err) {
      console.log(err);
    }
    // Extract order_services data from ordersData
    const orderServicesData = ordersData.flatMap(order => {
      return order.services.map(service => ({
        orderId: order.id,
        serviceId: service.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });
    try {
      await queryInterface.bulkInsert('order_services', orderServicesData);
    } catch(err) {
      console.log(err);
    }
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_services', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('services', null, {});
  }
};
