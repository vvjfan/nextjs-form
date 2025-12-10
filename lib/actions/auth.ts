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

  const parsedForm = signUpFormSchema.safeParse(form)
  if (!parsedForm.success) {
    // If validation fails, return the form data and field errors
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
}

export async function signIn(
  _initialState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const form = Object.fromEntries(formData) as SignInFormData

  const parsedForm = signInFormSchema.safeParse(form)
  if (!parsedForm.success) {
    // If validation fails, return the form data and field errors
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
} 