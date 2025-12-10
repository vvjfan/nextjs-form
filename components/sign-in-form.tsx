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
import { type SignInActionState, signInFormSchema, type SignInFormData } from '@/lib/definitions/auth'
import { useActionState, useState, useTransition } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'

interface SignInFormProps {
  action: (initialState: SignInActionState, formData: FormData) => Promise<SignInActionState>
}

export default function SignInForm({ action }: SignInFormProps) {
  const [actionState, submitAction, isPending] = useActionState(action, {})
  const [, startTransition] = useTransition()
  
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onBlur',
    defaultValues: actionState.formData || { 
      email: '', 
      password: '',
    },
  })

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back! Please sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-signin-demo"
          action={submitAction}
          onSubmit={form.handleSubmit((_, e) => {
            startTransition(() => {
              const formData = new FormData(e?.target)
              submitAction(formData)
            })
          })}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signin-demo-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signin-demo-email"
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
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="form-signin-demo-password">
                      Password
                    </FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-signin-demo-password"
                      type={isPasswordVisible ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      required
                    />
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      aria-pressed={isPasswordVisible}
                      aria-controls="password"
                    >
                      {isPasswordVisible ? (
                        <EyeOffIcon size={16} aria-hidden="true" />
                      ) : (
                        <EyeIcon size={16} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Field orientation="horizontal">
            <Checkbox id="remember" defaultChecked />
            <FieldLabel htmlFor="remember" className="text-sm font-normal">
              Remember me
            </FieldLabel>
          </Field>
          
          <Button className="w-full" type="submit" disabled={isPending}>
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-sm text-center text-muted-foreground dark:text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="ml-auto text-sm underline-offset-4 hover:underline text-foreground dark:text-foreground"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}