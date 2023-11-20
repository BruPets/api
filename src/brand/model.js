import { CustomError } from '../helpers/customError.js'
import { prisma } from '../prisma/index.js'

export class BrandModel {
  static async create ({ input }) {
    try {
      return await prisma.brand.create({
        data: input
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }
  }

  static async getAll () {
    try {
      return await prisma.brand.findMany({})
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }
  }

  static async getById ({ id }) {
    try {
      return await prisma.brand.findUniqueOrThrow({
        where: { id }
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 404 })
    }
  }

  static async delete ({ id }) {
    try {
      return await prisma.brand.delete({ where: { id } })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }
  }

  static async update ({ id, input }) {
    try {
      return await prisma.brand.update({
        where: { id },
        data: input
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }
  }
}
