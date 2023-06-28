const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');

// Get all products
router.get('/', ProductController.getProducts);

// Create new product
router.post('/', protect, admin, ProductController.createProduct);

// review product
router.post('/:id/review', protect, ProductController.createProductReview);

// Get top rated products
router.get('/top', ProductController.getTopProducts);

// Get single product
router.get('/:id', ProductController.getProductById);

// Update product
router.put('/:id', protect, admin, ProductController.updateProduct);

// Delete product
router.delete('/:id', protect, admin, ProductController.deleteProduct);

module.exports = router;
