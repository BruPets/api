import { CustomError } from '../../helpers/customError.js'
import { prisma } from '../../prisma/index.js'

export class CategoryModel {
  static async create ({ input }) {
    const { name, description } = input

    try {
      return await prisma.category.create({
        data: { name, description }
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 409 })
    }
  }

  static async getAll () {
    try {
      return await prisma.category.findMany({})
    } catch (error) {
      throw new CustomError({ message: 'Query invalid!', status: 500 })
    }
  }

  static async getById ({ id }) {
    try {
      return await prisma.category.findUniqueOrThrow({ where: { id } })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 404 })
    }
  }

  static async update ({ id, input }) {}
}
