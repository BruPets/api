import { BrandModel } from './model.js'
import { validateBrand } from './schema.js'

export class BrandController {
  static async create (req, res) {
    const result = validateBrand(req.body)

    if (!result.success) {
      return res.status(206).json({ message: JSON.parse(result.error.message) })
    }

    try {
      res.status(201).json(await BrandModel.create({ input: result.data }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  static async getAll (_, res) {
    try {
      res.status(200).json(await BrandModel.getAll())
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    const { id } = req.params
    try {
      res.status(200).json(await BrandModel.getById({ id: Number(id) }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateBrand(req.body)

    if (!result.success) {
      return res.status(206).json({ message: JSON.parse(result.error.message) })
    }

    try {
      res.status(200).json(await BrandModel.update({ id: Number(id), input: result.data }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    try {
      res.status(200).json(await BrandModel.delete({ id: Number(id) }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }
}
