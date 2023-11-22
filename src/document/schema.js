import z from 'zod'

const documentTypeSchema = z.object({
  name: z.string()
})

export const validateDocumentType = input => documentTypeSchema.safeParse(input)
