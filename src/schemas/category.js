import z from 'zod'

const categorySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.boolean().optional()
})

export const validateCategory = (input) => {
  return categorySchema.safeParse(input)
}
