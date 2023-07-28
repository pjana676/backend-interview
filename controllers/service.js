
const Joi = require('joi');
const validate = require('../middlewares/validateRequest');
const serviceRef = require('../services/service');


const serviceSchema = Joi.object({
  name: Joi.string()
    .required()
    .label('name')
})


/**
 * Get all service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllServices = async (req, res, next) => {
  try {
    const service = await serviceRef.getAllServices({});
    res.success({ data: service });
  } catch (error) {
    next(error)
  }
};


/**
 * Create a new service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createService = [
  validate(serviceSchema),
  async (req, res, next) => {
    try {
      const service = await serviceRef.createService({ ...req.body });
      res.success({ data: service });
    } catch (error) {
      next(error)
    }
  }];

/**
 * Get service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await serviceRef.getService({ serviceId });
    res.success({ data: service });
  } catch (error) {
    next(error)
  }
};

/**
 * Update an existing service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateService = [
  validate(serviceSchema),
  async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const service = await serviceRef.updateService({ serviceId, ...req.body });
      res.success({ data: service });
    } catch (error) {
      next(error)
    }
  }];

/**
 * Delete an service
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await serviceRef.deleteService({ serviceId });
    res.success({ data: service });
  } catch (error) {
    next(error)
  }
};


module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};