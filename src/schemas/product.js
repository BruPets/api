import z from 'zod'

const productSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  stock: z.number().optional(),
  price: z.number(),
  categories: z.array(z.number()),
  image: z.string().url(),
  images: z.array(z.string().url()).optional()
})

export const validateProduct = (input) => {
  return productSchema.safeParse(input)
}
