const errorHandler = (err, req, res, next) => {
  // Default error status code
  let statusCode = 500;
  // Default error message
  let message = 'Internal Server Error';

  // Check if the error has a defined status code and message
  if (res.statusCode) {
    statusCode = res.statusCode;
    message = err.message;
  } else if (err.name === 'SequelizeValidationError') {
    // Handle Sequelize validation errors
    statusCode = 400;
    message = err.errors.map((error) => error.message).join(', ');
  }

  // Log the error for debugging purposes
  console.error(err);

  // Send the error response
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
