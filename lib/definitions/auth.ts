import { z } from 'zod'

// Sign Up Form Schema
export const signUpFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).toLowerCase().trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    }),
})

export type SignUpFormData = z.infer<typeof signUpFormSchema>
type SignUpFieldErrors = z.ZodFlattenedError<SignUpFormData>['fieldErrors']

export type SignUpActionState = {
  formData?: SignUpFormData
  fieldErrors?: SignUpFieldErrors
}

// Sign In Form Schema
export const signInFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).toLowerCase().trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .max(32, { message: 'Be at most 32 characters long' }),
  // rememberMe: z.boolean().default(false),
})

export type SignInFormData = z.infer<typeof signInFormSchema>
type SignInFieldErrors = z.ZodFlattenedError<SignInFormData>['fieldErrors']

export type SignInActionState = {
  formData?: SignInFormData
  fieldErrors?: SignInFieldErrors
}
