export const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);
  
  // Default error response
  let status = 500;
  let message = 'Internal Server Error';
  
  // Handle specific error types
  if (error.name === 'ValidationError') {
    status = 400;
    message = error.message;
  } else if (error.name === 'CastError') {
    status = 400;
    message = 'Invalid ID format';
  } else if (error.code === 'ENOENT') {
    status = 404;
    message = 'File not found';
  }
  
  res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};