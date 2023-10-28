import { accessToken } from '../../helpers/accessToken.js'
import { CustomError } from '../../helpers/customError.js'
import { prisma } from './index.js'

export class LoginModel {
  static async login ({ input }) {
    const { email, password } = input

    let user = null

    try {
      user = await prisma.user.findUniqueOrThrow({ where: { email }, include: { role: true } })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 500 })
    }

    if (!user) {
      throw new CustomError({ message: 'User not found!', status: 404 })
    }

    if (password !== user.password) {
      throw new CustomError({ message: 'Invalid password!', status: 401 })
    }

    const { name, id, role } = user

    return {
      id,
      name,
      email: user.email,
      role: role.name,
      token: accessToken({ id, role: role.name })
    }
  }
}
