import { z } from 'zod'

// Schemas
export const emailSchema = z.string().email()
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(32, { message: 'Password must not exceed 32 characters' })
  .refine(value => /[a-z]/.test(value), { message: 'Password must include lowercase letter' })
  .refine(value => /[A-Z]/.test(value), { message: 'Password must include uppercase letter' })
  .refine(value => /\d/.test(value), { message: 'Password must include at least one number' })
  .refine(value => /[@$!%*?&]/.test(value), { message: 'Password must contain a special character' })

export const requiredStringSchema = z.string()

export const signupValidator = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password confirmation does not match',
    path: ['confirmPassword'],
  })

// Validator
export const emailValidator = z.object({
  email: emailSchema,
})

export const loginValidator = z.object({
  email: emailSchema,
  password: requiredStringSchema,
})

export const resetPasswordValidator = z
  .object({
    token: requiredStringSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password confirmation does not match',
    path: ['confirmPassword'],
  })
