import 'dotenv/config'

export const PORT = process.env.PORT ?? 3000

export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS ?? [
  'http://localhost:3000'
]

export const DATABASE_URL = process.env.DATABASE_URL ?? {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'MYDB'
}

export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'daksdjadii23jend'
