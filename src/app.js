import express, { json } from 'express'
import morgan from 'morgan'
import { PORT } from './config/index.js'
import { corsMiddleware } from './middlewares/cors.js'
import { createRootRouter } from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'

export const createApp = () => {
  const app = express()
  app.use(json())
  app.use(morgan('dev'))
  app.disable('x-powered-by')
  app.use(corsMiddleware())

  app.use(createRootRouter())

  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
