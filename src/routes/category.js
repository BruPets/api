import { Router } from 'express'
import { CategoryModel } from '../models/mysql/category.js'
import { CategoryController } from '../controllers/category.js'
import { authenticateToken } from '../helpers/authenticateToken.js'

export const createCategoryRouter = () => {
  const categoryRouter = Router()

  const categoryController = new CategoryController({ categoryModel: CategoryModel })

  categoryRouter.get('/', categoryController.getAll)
  categoryRouter.get('/:id', categoryController.getById)
  categoryRouter.put('/:id', authenticateToken, categoryController.update)
  categoryRouter.post('/', categoryController.create)
  categoryRouter.patch('/', authenticateToken, categoryController.upsert)
  categoryRouter.delete('/:id', authenticateToken, categoryController.delete)

  return categoryRouter
}
