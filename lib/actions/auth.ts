'use server'

import * as z from "zod"
import { 
  type SignUpActionState,
  type SignUpFormData,
  signUpFormSchema,
  type SignInActionState,
  type SignInFormData,
  signInFormSchema
} from "@/lib/definitions/auth"
import { redirect } from "next/navigation"

export async function signUp(
  _initialState: SignUpActionState,
  formData: FormData,
): Promise<SignUpActionState> {
  const form = Object.fromEntries(formData) as SignUpFormData

  try {
    const parsedForm = signUpFormSchema.safeParse(form)
    if (!parsedForm.success) {
      return {
        formData: form,
        fieldErrors: z.flattenError(parsedForm.error).fieldErrors,
      }
    }

    // sign up processing
    // delay 200ms to simulate server processing
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log('sign up processing: ', parsedForm.data)

    // Here is where you would create an active session for the user before redirecting

    redirect('/sign-in')
  } catch (error) {
    // Handle unexpected errors (excluding redirect which throws a special error)
    if (error instanceof z.ZodError) {
      return {
        formData: form,
        fieldErrors: z.flattenError(error).fieldErrors,
      }
    }
    
    // Re-throw redirect errors (Next.js uses throws for redirects)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error
    }
    
    console.error('Sign up error:', error)
    return {
      formData: form,
      formError: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function signIn(
  _initialState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const form = Object.fromEntries(formData) as SignInFormData

  try {
    const parsedForm = signInFormSchema.safeParse(form)
    if (!parsedForm.success) {
      return {
        formData: form,
        fieldErrors: z.flattenError(parsedForm.error).fieldErrors,
      }
    }

    // sign in processing
    // delay 200ms to simulate server processing
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log('sign in processing: ', parsedForm.data)

    // Here is where you would create an active session for the user before redirecting

    redirect('/')
  } catch (error) {
    // Handle unexpected errors (excluding redirect which throws a special error)
    if (error instanceof z.ZodError) {
      return {
        formData: form,
        fieldErrors: z.flattenError(error).fieldErrors,
      }
    }
    
    // Re-throw redirect errors (Next.js uses throws for redirects)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error
    }
    
    console.error('Sign in error:', error)
    return {
      formData: form,
      formError: 'An unexpected error occurred. Please try again.',
    }
  }
}
