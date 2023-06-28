const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/auth');

// Get user orders
router.get('/mine', protect, OrderController.getMyOrders);

// Get all orders
router.get('/', protect, admin, OrderController.getAllOrders);

// Get order by id
router.get('/:id', protect, OrderController.getOrderById);

// Create order
router.post('/', protect, OrderController.createOrder);

// update to pay
router.put('/:id/pay', protect, OrderController.updateOrderToPaid);

// update to deliverd
router.put('/:id/deliver', protect, OrderController.updateOrderToDelivered);

module.exports = router;
