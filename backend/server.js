const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

// const syncDB = require('./config/syncdb');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const prodRouter = require('./routes/product');

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

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', prodRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App backend listening on port ${PORT}`);
});
