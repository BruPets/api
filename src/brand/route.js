import { Router } from 'express'
import { BrandController } from './controller.js'
import { authenticateToken } from '../helpers/authenticateToken.js'

export const createBrandRouter = () => {
  const brandRouter = Router()

  brandRouter.post('/', authenticateToken, BrandController.create)
  brandRouter.get('/', BrandController.getAll)
  brandRouter.get('/:id', BrandController.getById)
  brandRouter.put('/:id', authenticateToken, BrandController.update)
  brandRouter.delete('/:id', authenticateToken, BrandController.delete)

  return brandRouter
}
