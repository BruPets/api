import { accessToken } from '../../helpers/accessToken.js'
import { CustomError } from '../../helpers/customError.js'
import { connection } from './index.js'

export class LoginModel {
  static async login ({ input }) {
    const { email, password } = input

    let user = null

    try {
      [[user]] = await connection.query(
        `
        SELECT 
          USERS.USER_ID AS id, 
          USERS.USER_NAME AS name, 
          USERS.USER_EMAIL AS email, 
          USERS.USER_PASSWORD AS password, 
          ROLES.ROLE_NAME AS role 
        FROM 
          USERS 
          INNER JOIN ROLES ON USERS.USER_ROLE_ID = ROLES.ROLE_ID 
        WHERE 
          USERS.USER_EMAIL = ?;
        `,
        [email]
      )
    } catch (error) {
      console.log(error)
      throw new CustomError({ message: 'Query invalid!', status: 500 })
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
      role,
      token: accessToken({ id, role })
    }
  }
}
