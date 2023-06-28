const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

const syncDB = require('./config/syncdb');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const prodRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const uploadRouter = require('./routes/upload');

const app = express();

dotenv.config();
// syncDB();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', prodRouter);
app.use('/api/order', orderRouter);
app.use('/api/upload', uploadRouter);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App backend listening on port ${PORT}`);
});
