const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error Encountered!";
  err.status = err.status || false;
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    status: err.status,
  });
};

export default errorMiddleware;
