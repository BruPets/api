import z from 'zod'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.'
    }).email(),
  password: z.string()
})

export const validateLogin = (input) => {
  return loginSchema.safeParse(input)
}
