import { Router } from 'express'
import { prisma } from '../prisma/index.js'
import { validateDocumentType } from './schema.js'
import { authenticateToken } from '../helpers/authenticateToken.js'

const documentRouter = Router()

documentRouter.get('/', async (_, res) => {
  res.json(await prisma.documentType.findMany({}))
})

documentRouter.post('/', authenticateToken, async (req, res) => {
  const result = validateDocumentType(req.body)

  if (!result.success) {
    return res.status(400).json({ message: JSON.stringify(result.error) })
  }

  try {
    res.status(201).json(await prisma.documentType.create({ data: result.data }))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

documentRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    res.json(await prisma.documentType.findUniqueOrThrow({
      where: {
        id: Number(id)
      }
    }))
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

documentRouter.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  const result = validateDocumentType(req.body)

  if (!result.success) {
    return res.status(400).json({ message: result.error.message })
  }

  try {
    res.json(await prisma.documentType.update({
      where: {
        id: Number(id)
      },
      data: result.data
    }))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

documentRouter.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  try {
    res.json(await prisma.documentType.delete({ where: { id: Number(id) } }))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default documentRouter
