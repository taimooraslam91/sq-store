const { Product, Review } = require('../models');
const { Op } = require('sequelize');
const asyncHandler = require('../middlewares/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  // Calculate the offset based on the page and limit
  const offset = (page - 1) * limit;

  // Query the products with pagination and search
  const products = await Product.findAndCountAll({
    where: {
      // Apply search query if provided
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    },
    offset,
    limit,
    order: [['updatedAt', 'DESC']],
  });
  if (products) {
    res.json({
      data: products.rows,
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page,
    });
  } else {
    res.status(404);
    throw new Error('Products not found');
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Retive single product by id
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
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
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, image, brand, category, description, price, countInStock } =
    req.body;
  // Get the logged-in user's ID from the authentication middleware or session
  const userId = req.user.id;

  // Update the product
  const product = await Product.update(
    {
      userId,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    },
    {
      where: { id },
    },
  );

  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Retive single product by id
  const product = await Product.findByPk(id);

  if (product) {
    // Delete the product
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Retrieve single product by id
  const product = await Product.findByPk(id);
  const { rating, review } = req.body;
  // Get the logged-in user's ID from the authentication middleware or session
  const userId = req.user.id;
  const name = req.user.name;

  if (product) {
    // Create the review
    const productReview = await Review.create({
      userId,
      productId: id,
      name,
      rating,
      review,
    });
    // Get the number of reviews for the product
    const numberOfReviews = await Review.count({ where: { productId: id } });
    // Get the sum of ratings for the product
    const sumOfRating = await Review.sum('rating', {
      where: { productId: id },
    });
    const averageRating = sumOfRating / numberOfReviews;
    // Update the product
    await Product.update(
      {
        numReviews: numberOfReviews,
        rating: averageRating,
      },
      { where: { id } }, // Add the where condition to specify the product
    );
    res.status(201).json({
      review: productReview,
      rating: averageRating,
      totalReviews: numberOfReviews,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  // Retrieve the top 4 products based on their ratings
  const topProducts = await Product.findAll({
    order: [['rating', 'DESC']],
    limit: 4,
  });

  res.json(topProducts);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
