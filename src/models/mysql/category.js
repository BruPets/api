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

  static async delete ({ id }) {
    try {
      return await prisma.category.delete({ where: { id } })
    } catch (error) {
      throw new CustomError({ message: 'Esta categoría no se puede eliminar, ya que pertenece a un producto!', status: 404 })
    }
  }

  static async upsert ({ input }) {
    const { name } = input

    try {
      return await prisma.category.upsert({
        where: {
          name
        },
        create: input,
        update: input
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 401 })
    }
  }

  static async update ({ id, input }) {
    try {
      return await prisma.category.update({
        where: {
          id
        },
        data: input
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 401 })
    }
  }
}
