const service = require('../models/service');
const __ = require('../helpers/locales');
const { createError } = require('../errors');

/**
 * Get all service
 * Can filter and pagination
 * @param {*} qFilter{} 
 * @param {*} limit
 * @param {*} offset 
 */
const getAllServices = async ({ qFilter, limit, offset }) => {
  const services = await service.findAll(qFilter, limit, offset);
  return services;
};


/**
 * Get an service
 * @param {*} serviceId 
 */
const getService = async ({ serviceId }) => {
  const serviceInfo = await service.findByPk(serviceId);
  return serviceInfo;
}


/**
 * Create a new service
 * @param {*} name 
 */
const createService = async ({ name }) => {
  try {
    const newService = await service.create({ name });
    return newService;
  } catch (error) {
    throw createError.BadRequest(error.message);
  }
}


/**
 * Create a new service
 * @param {*} name 
 * @param {*} serviceId 
 */
const updateService = async ({ serviceId, ...restObj }) => {
  try {
    const serviceInfo = await service.findByPk(serviceId);

    if (!serviceInfo) {
      throw createError.BadRequest(__.invalid_service_reference);
    }

    await serviceInfo.update(restObj);
    return serviceInfo;
  } catch (error) {
    throw createError.BadRequest(error.message);
  }
}


/**
 * Delete an service
 * @param {*} orderId 
 */
const deleteService = async ({ serviceId }) => {
  const serviceInfo = await service.findByPk(serviceId);

  if (!serviceInfo) {
    throw createError.BadRequest(__.invalid_service_reference);
  }

  await serviceInfo.destroy();
  return __.message_deleted;
}

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};