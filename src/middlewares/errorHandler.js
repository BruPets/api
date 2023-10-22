import { CustomError } from '../helpers/customError.js'

export const errorHandler = (err, req, res, next) => {
  if (!(err instanceof CustomError)) {
    throw new Error('error parameter must be an instance of the Error class')
  }

  if (isNaN(err.name) || err.name < 100 || err.name > 599) {
    throw new Error('name property must be a valid HTTP status code')
  }
  res.status(err.name).json({ message: err.message })
  next(err)
}
