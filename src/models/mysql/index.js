import mysql from 'mysql2'
import { DATABASE_URL } from '../../config/index.js'

export const db = mysql.createPool(DATABASE_URL)
