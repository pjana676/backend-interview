const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');

router.get('/list', serviceController.getAllServices);
router.get('/:serviceId', serviceController.getService);
router.post('/', serviceController.createService);
router.put('/:serviceId', serviceController.updateService);
router.delete('/:serviceId', serviceController.deleteService);

module.exports = router;