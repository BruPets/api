import { validateCategory } from '../schemas/category.js'

export class CategoryController {
  constructor ({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  create = async (req, res) => {
    const result = validateCategory(req.body)

    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    try {
      res.status(201).json(await this.categoryModel.create({ input: result.data }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  getAll = async (_, res) => {
    try {
      res.status(200).json(await this.categoryModel.getAll())
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    try {
      res.status(200).json(await this.categoryModel.getById({ id }))
    } catch (error) {
      res.status(error.name).json({ message: error.message })
    }
  }
}
