import { Router } from 'express'
import { ProductController } from './controller.js'

export const createProductRouter = () => {
  const productRouter = Router()

  productRouter.post('/', ProductController.create)
  productRouter.get('/', ProductController.getAll)
  productRouter.get('/:id', ProductController.getById)

  return productRouter
}
