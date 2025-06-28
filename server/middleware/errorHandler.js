export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

export const customErrorHandler = (statusCode, message) => {
  const error = new Error();
  error.message = message;
  error.statusCode = statusCode;
  return error;
};
