const { Product } = require('../models');

const getProducts = async (req, res) => {
  try {
    // Retrive all product from database
    const products = Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // Retive single product by id
    const product = Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, image, brand, category, description, price, countInStock } =
      req.body;
    // Get the logged-in user's ID from the authentication middleware or session
    const userId = req.user.id;

    // Create the product
    const product = await Product.create({
      userId,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
