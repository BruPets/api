import mysql from 'mysql2/promise'
import { DATABASE_URL } from '../../config/index.js'

export const connection = await mysql.createConnection(DATABASE_URL)
