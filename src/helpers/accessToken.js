import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/index.js'

export const accessToken = (input) => {
  return jwt.sign(input, TOKEN_SECRET, { expiresIn: '24h' })
}
