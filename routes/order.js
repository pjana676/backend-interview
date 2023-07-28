const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/list', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrder);
router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;