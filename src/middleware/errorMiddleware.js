const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message,
    field: err.field,
  });
};

export default errorMiddleware;
