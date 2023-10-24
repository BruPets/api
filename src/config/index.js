import 'dotenv/config'

export const PORT = process.env.PORT ?? 3000

export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS ?? [
  'http://localhost:3000'
]

export const DATABASE_URL = {
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? '1234',
  database: process.env.DB_NAME ?? 'MYDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'daksdjadii23jend'
