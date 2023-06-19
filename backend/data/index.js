const { v4: uuidv4 } = require('uuid');
const Helper = require('../utils/helper');

const Products = [
  {
    id: uuidv4(),
    name: 'iPhone 12',
    image: 'iphone12.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'The latest iPhone with powerful features and stunning design.',
    price: 999.99,
    countInStock: 20,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Samsung Galaxy S21',
    image: 'galaxys21.jpg',
    brand: 'Samsung',
    category: 'Electronics',
    description:
      'A flagship smartphone with a brilliant display and advanced camera.',
    price: 899.99,
    countInStock: 15,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Sony PlayStation 5',
    image: 'ps5.jpg',
    brand: 'Sony',
    category: 'Gaming',
    description: 'Experience next-generation gaming with the PS5 console.',
    price: 499.99,
    countInStock: 10,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Nike Air Max 270',
    image: 'airmax270.jpg',
    brand: 'Nike',
    category: 'Footwear',
    description: 'Comfortable and stylish sneakers for everyday wear.',
    price: 129.99,
    countInStock: 30,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Canon EOS 80D',
    image: 'eos80d.jpg',
    brand: 'Canon',
    category: 'Electronics',
    description:
      'A versatile DSLR camera for capturing stunning photos and videos.',
    price: 1199.99,
    countInStock: 8,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Samsung 65-Inch 4K Smart TV',
    image: 'samsungtv.jpg',
    brand: 'Samsung',
    category: 'Electronics',
    description:
      'Immerse yourself in a stunning visual experience with this 65-inch 4K Smart TV.',
    price: 1499.99,
    countInStock: 5,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Apple MacBook Pro',
    image: 'macbookpro.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description: 'A powerful and sleek laptop for professionals.',
    price: 1999.99,
    countInStock: 3,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Adidas Ultraboost',
    image: 'ultraboost.jpg',
    brand: 'Adidas',
    category: 'Footwear',
    description: 'High-performance running shoes with exceptional comfort.',
    price: 169.99,
    countInStock: 18,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'LG 55-Inch OLED TV',
    image: 'lgtv.jpg',
    brand: 'LG',
    category: 'Electronics',
    description:
      'Experience stunning picture quality with this 55-inch OLED TV.',
    price: 2499.99,
    countInStock: 2,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Bose QuietComfort 35 II',
    image: 'boseqc35.jpg',
    brand: 'Bose',
    category: 'Electronics',
    description:
      'Wireless noise-cancelling headphones for immersive audio experience.',
    price: 299.99,
    countInStock: 6,
    noOfReviews: 0,
    rating: 0,
    userId: '5cdc3414-1865-409f-b083-055224cf27f7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Users = [
  {
    id: uuidv4(),
    name: 'Taimoor Aslam',
    email: 'taimoor@estore.com',
    password: 'admin123',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    password: 'abc123',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'abc123',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Emily Brown',
    email: 'emilybrown@example.com',
    password: 'abc123',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'David Wilson',
    email: 'davidwilson@example.com',
    password: 'abc123',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = { Products, Users };
