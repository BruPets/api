import { accessToken } from '../../helpers/accessToken.js'
import { CustomError } from '../../helpers/customError.js'
import { connection } from './index.js'

export class LoginModel {
  static async login ({ input }) {
    const { email, password } = input

    const [[user]] = await connection.query(
      `
      SELECT 
        BIN_TO_UUID(users.USER_ID) AS id, 
        users.USER_NAME AS name, 
        users.USER_EMAIL AS email, 
        users.USER_PASSWORD AS password, 
        roles.ROLE_NAME AS role 
      FROM 
        users 
        INNER JOIN roles ON users.USER_ROLE_ID = roles.ROLE_ID 
      WHERE 
        users.user_email = ?;
    `,
      [email]
    )

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
      role,
      token: accessToken({ id, role })
    }
  }
}
