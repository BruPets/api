import { Router } from 'express'
import { LoginController } from '../controllers/login.js'
import { LoginModel } from '../models/mysql/login.js'

export const createLoginRouter = () => {
  const loginRouter = Router()

  const loginController = new LoginController({ loginModel: LoginModel })

  loginRouter.post('/login', loginController.login)

  return loginRouter
}
