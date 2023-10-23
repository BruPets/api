export const errorHandler = (err, req, res, next) => {
  res.status(isNaN(err.name) ? 500 : err.name).json({ message: err.message })
  next(err)
}
