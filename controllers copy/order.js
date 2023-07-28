const Joi = require('joi');
const validate = require('../middlewares/validateRequest');
const orderService = require('../services/order');



const orderSchema = Joi.object({
  datetime: Joi.date()
    .raw()
    .required()
    .label('datetime'),
  totalfee: Joi.number()
    .required()
    .label('totalfee'),
  services: Joi.array().items(Joi.number()).min(1).required()
    .label('services')
})


const orderUpdateSchema = Joi.object({
  datetime: Joi.date()
    .raw()
    .label('datetime'),
  totalfee: Joi.number()
    .label('totalfee'),
  services: Joi.array().items(Joi.number()).min(1)
    .label('services')
})

/**
 * Get all orders
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders({});
    res.success({ data: orders });
  } catch (error) {
    next(error)
  }
};

/**
 * Create a new order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createOrder = [
  validate(orderSchema),
  async (req, res, next) => {
    try {
      const orders = await orderService.createOrder({ ...req.body });
      res.success({ data: orders });
    } catch (error) {
      next(error)
    }
  }];

/**
 * Get order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrder({ orderId });
    res.success({ data: order });
  } catch (error) {
    next(error)
  }
};

/**
 * Update an existing order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateOrder = [
  validate(orderUpdateSchema),
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const orders = await orderService.updateOrder({ orderId, ...req.body });
      res.success({ data: orders });
    } catch (error) {
      next(error)
    }
  }];

/**
 * Delete an order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orders = await orderService.deleteOrder({ orderId });
    res.success({ data: orders });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};