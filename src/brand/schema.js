import z from 'zod'

const brandSchema = z.object({
  name: z.string(),
  image: z.string().url()
})

export const validateBrand = input => brandSchema.safeParse(input)
