import { Router } from 'express'
import { createLoginRouter } from './login.js'
import { createCategoryRouter } from './category.js'

export const createRootRouter = () => {
  const rootRouter = Router()

  rootRouter.get('/', (_, res) => {
    res.json({ message: 'Brupet\'s API' })
  })

  rootRouter.use('/', createLoginRouter())
  rootRouter.use('/categories', createCategoryRouter())

  return rootRouter
}
