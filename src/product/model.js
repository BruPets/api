import { CustomError } from '../helpers/customError.js'
import { prisma } from '../prisma/index.js'

export class ProductModel {
  static async create ({ input }) {
    const { name, code, description, price, image, categories, stock } = input

    let newProduct = null
    try {
      newProduct = await prisma.product.create({
        data: {
          name,
          code,
          description,
          price,
          image,
          stock
        }
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }

    try {
      const newCategoriesOnProducts = categories.map((id) => ({
        categoryId: id,
        productId: newProduct.id
      }))

      await prisma.categoriesOnProducts.createMany({
        data: newCategoriesOnProducts
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }

    return newProduct
  }

  static async getAll ({ page, items }) {
    try {
      return await prisma.product.findMany({ skip: page * items, take: items, where: { status: true }, orderBy: { id: 'asc' } })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }
  }

  static async getById ({ id }) {
    try {
      return await prisma.product.findUniqueOrThrow({
        where: { id },
        include: {
          categories: {
            include: { category: true }
          },
          images: true
        }
      })
    } catch (error) {
      throw new CustomError({ message: error.message, status: 400 })
    }
  }
}
