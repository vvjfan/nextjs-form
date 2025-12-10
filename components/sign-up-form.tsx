'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { type SignUpActionState, signUpFormSchema, type SignUpFormData } from '@/lib/definitions/auth'
import { useActionState, useTransition } from 'react'

interface SignUpFormProps {
  action: (initialState: SignUpActionState, formData: FormData) => Promise<SignUpActionState>
}

export default function SignUpForm({ action }: SignUpFormProps) {
  const [actionState, submitAction, isPending] = useActionState(action, {})
  const [, startTransition] = useTransition()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
    defaultValues: actionState.formData || { 
      email: '', 
      password: '',
    },
  })

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Welcome! Please fill in the details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-signup-demo" 
          action={submitAction}
          onSubmit={handleSubmit((_, e) => {
            startTransition(() => {
              const formData = new FormData(e?.target)
              submitAction(formData)
            })
          })}
          className="space-y-4"
          noValidate
        >
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-demo-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-demo-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-demo-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-demo-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          
          <Button className="w-full" type="submit" disabled={isPending}>
            Sign Up
          </Button>
        </form>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          By joining, you agree to our{' '}
          <a href="/terms" className="hover:text-primary underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="hover:text-primary underline">
            Privacy Policy
          </a>
        </p>
      </CardContent>
    </Card>
  )
}