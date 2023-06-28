const asyncHandler = require('../middlewares/asyncHandler');
const { Order, OrderItem, Product, User } = require('../models');

const getMyOrders = asyncHandler(async (req, res) => {
  // Get the logged-in user's ID from the authentication middleware or session
  const userId = req.user.id;

  // Retrieve the order with its associated order items from the database
  const order = await Order.findAll({
    where: { userId },
    include: [
      {
        model: OrderItem,
        as: 'OrderItems',
        include: [{ model: Product, as: 'Product' }],
      },
    ],
  });

  res.status(200).json(order);
});

const getAllOrders = asyncHandler(async (req, res) => {
  // Retrieve all orders from the database
  const orders = await Order.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
      {
        model: OrderItem,
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'image'],
        },
      },
    ],
  });

  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  // Get the logged-in user's ID from the authentication middleware or session
  const { id } = req.params;
  console.log('getOrderById', id);
  // Retrieve the user's orders from the database
  const order = await Order.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'User',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: OrderItem,
        as: 'OrderItems',
      },
    ],
  });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = await Order.create({
    userId: req.user.id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  if (order) {
    // Create order items
    for (const orderItem of orderItems) {
      const { id: productId, qty } = orderItem;
      const product = await Product.findByPk(productId);

      if (product) {
        await OrderItem.create({
          orderId: order.id,
          productId,
          qty: qty,
          price: product.price,
          name: product.name,
          image: product.image,
        });
      }
    }

    res.status(201).json({
      order,
    });
  } else {
    res.status(500);
    throw new Error('Failed to create order');
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the order by ID
  const order = await Order.findByPk(id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();

    // Save the updated order to the database
    await order.save();

    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    await order.save();

    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  getAllOrders,
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
};
