import { Router } from 'express'
import { CategoryModel } from '../models/mysql/category.js'
import { CategoryController } from '../controllers/category.js'

export const createCategoryRouter = () => {
  const categoryRouter = Router()

  const categoryController = new CategoryController({ categoryModel: CategoryModel })

  categoryRouter.get('/', categoryController.getAll)
  categoryRouter.get('/:id', categoryController.getById)
  categoryRouter.post('/', categoryController.create)

  return categoryRouter
}
