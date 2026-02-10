'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Logo } from '@/components/logo'
import { type SignUpActionState, signUpFormSchema, type SignUpFormData } from '@/lib/definitions/auth'
import { useActionState, useTransition } from 'react'
import Link from 'next/link'

interface SignUpFormProps {
  action: (initialState: SignUpActionState, formData: FormData) => Promise<SignUpActionState>
}

export default function SignUpForm({ action }: SignUpFormProps) {
  const [actionState, submitAction, isPending] = useActionState(action, {})
  const [, startTransition] = useTransition()

  const {
    control,
    handleSubmit,
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
        <CardTitle className='flex items-center justify-center'>
          <Logo
            className="mr-2 h-10 w-10 text-foreground dark:text-foreground"
            aria-hidden={true}
          />
          Create your account
        </CardTitle>
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

          {actionState.formError && (
            <div
              role="alert"
              className="rounded-md bg-destructive/15 p-3 text-sm text-destructive"
            >
              {actionState.formError}
            </div>
          )}

          <Button className="w-full" type="submit" disabled={isPending}>
            Sign Up
          </Button>
        </form>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          By joining, you agree to our{' '}
          <a href="/terms" className="underline-offset-4 hover:underline capitalize text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline-offset-4 hover:underline capitalize text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90">
            Privacy Policy
          </a>
        </p>
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-muted-foreground dark:text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium underline-offset-4 hover:underline text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}