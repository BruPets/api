import { Router } from 'express'
import { createLoginRouter } from './login.js'

export const createRootRouter = () => {
  const rootRouter = Router()

  rootRouter.get('/', (_, res) => {
    res.json({ message: 'Brupet\'s API' })
  })

  rootRouter.use('/', createLoginRouter())

  return rootRouter
}
