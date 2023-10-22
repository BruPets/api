import { validateLogin } from '../schemas/login.js'

export class LoginController {
  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const result = validateLogin(req.body)

    if (!result.success) {
      return res.status(404).json({ message: JSON.parse(result.error.message) })
    }

    try {
      res.status(200).json(await this.loginModel.login({ input: result.data }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }
}
