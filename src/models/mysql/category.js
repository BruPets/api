import { CustomError } from '../../helpers/customError.js'
import { prisma } from './index.js'

export class CategoryModel {
  static async create ({ input }) {
    const { name, description } = input

    try {
      const [[insertId]] = await prisma.execute(
        `
          INSERT INTO CATEGORIES (CATEGORY_NAME, CATEGORY_DESCRIPTION)
          VALUE (?, ?);
        `, [name, description]
      )

      return { insertId }
    } catch (error) {
      throw new CustomError({ message: error.message, status: 409 })
    }
  }

  static async getAll () {
    let categories = null
    try {
      [categories] = await prisma.execute(
        `
        SELECT
          CATEGORY_ID AS id,
          CATEGORY_NAME AS name,
          CATEGORY_DESCRIPTION AS description,
          CATEGORY_STATUS AS status
        FROM
          CATEGORIES;
          `
      )
    } catch (error) {
      throw new CustomError({ message: 'Query invalid!', status: 500 })
    }

    return categories
  }

  static async getById ({ id }) {
    let category = null
    try {
      [[category]] = await prisma.execute(
        `
          SELECT
            CATEGORY_ID AS id,
            CATEGORY_NAME AS name,
            CATEGORY_DESCRIPTION AS description,
            CATEGORY_STATUS AS status
          FROM
            CATEGORIES
          WHERE CATEGORY_ID = ?;
        `, [id]
      )
    } catch (error) {
      throw new CustomError({ message: 'Query invalid!', status: 500 })
    }

    if (!category) {
      throw new CustomError({ message: `Category as id: ${id} not found!`, status: 404 })
    }

    return category
  }

  static async update ({ id, input }) {

  }
}
