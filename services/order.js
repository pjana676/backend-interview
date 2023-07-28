const { createError } = require('../errors');
const __ = require('../helpers/locales');
const order = require('../models/order');
const service = require('../models/service');
const orderService = require('../models/orderService');

/**
 * Get all orders
 * Can filter and pagination
 * @param {*} qFilter{} 
 * @param {*} limit
 * @param {*} offset 
 */
const getAllOrders = async () => {
  const orders = await order.findAll({
    include: [
      {
        model: orderService,
        include: [
          {
            model: service,
            attributes: ['id', 'name'], // Specify the attributes you want to include from the Service model
          },
        ],
      },
    ],
  });
  return orders;
};

/**
 * Create a new order
 * @param {*} datetime 
 * @param {*} totalfee 
 */
const createOrder = async ({ datetime, totalfee, services }) => {
  try {
    const serviceCount = await service.count({
      where: { id: services }
    })
    if (serviceCount !== services.length)
      throw createError.BadRequest(__.invalid_service_reference);

    const newOrder = await order.create({ datetime, totalfee });
    // Create associations with services
    if (services && services.length > 0) {
      for (const serviceId of services) {
        const serviceInfo = await service.findByPk(serviceId);
        if (serviceInfo) {
          await orderService.create({ orderId: newOrder.id, serviceId });
        }
      }
    }
    return newOrder;
  } catch (error) {
    throw createError.BadRequest(error.message);
  }
}

/**
 * Get an order
 * @param {*} orderId 
 */
const getOrder = async ({ orderId }) => {
  const orderInfo = await order.findByPk(orderId, {
    include: [
      {
        model: orderService,
        include: [
          {
            model: service,
            attributes: ['id', 'name'], // Specify the attributes you want to include from the Service model
          },
        ],
      },
    ],
  });
  return orderInfo;
}

/**
 * Update an existing order
 * @param {*} orderId 
 * @param {*} datetime 
 * @param {*} totalfee 
 */
const updateOrder = async ({ orderId, ...restObj }) => {
  try {
    const orderInfo = await order.findByPk(orderId);

    if (!orderInfo) {
      throw createError.BadRequest(__.invalid_order_reference);
    }

    await orderInfo.update(restObj);
    return orderInfo;
  } catch (error) {
    throw createError.BadRequest(error.message);
  }
}

/**
 * Delete an order
 * @param {*} orderId 
 */
const deleteOrder = async ({ orderId }) => {
  const orderInfo = await order.findByPk(orderId);

  if (!orderInfo) {
    throw createError.BadRequest(__.invalid_order_reference);
  }

  await orderService.destroy({ where: { orderId: orderId } })

  await orderInfo.destroy();
  return __.message_deleted;
}

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

