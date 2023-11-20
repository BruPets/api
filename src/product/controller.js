import { ProductModel } from './model.js'
import { validateProduct } from './schema.js'

export class ProductController {
  static async create (req, res) {
    const result = validateProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    try {
      res.status(201).json(await ProductModel.create({ input: result.data }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  static async getAll (req, res) {
    try {
      res.status(200).json(await ProductModel.getAll())
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    const { id } = req.params
    try {
      res.status(200).json(await ProductModel.getById({ id }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }
}
