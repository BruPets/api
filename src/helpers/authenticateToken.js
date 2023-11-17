import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/index.js'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ message: 'El token es requerido!' })

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalido!' })
    req.user = user
    next()
  })
}
