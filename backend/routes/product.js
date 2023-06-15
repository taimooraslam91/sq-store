const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const AuthMiddleware = require('../middleware/auth');

// Get all products
router.get('/', ProductController.getProducts);

router.get('/:id', ProductController.getProductById);

router.post(
  '/',
  AuthMiddleware.authenticateToken,
  ProductController.createProduct,
);

module.exports = router;
