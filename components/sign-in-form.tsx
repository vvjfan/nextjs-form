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
import { JSX, SVGProps, useActionState, useState, useTransition } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'

const Logo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="48"
    viewBox="0 0 40 48"
    width="40"
    {...props}
  >
    <clipPath id="a">
      <path d="m0 0h40v48h-40z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
      <path d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
      <path d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
      <path d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
      <path d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
      <path d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
    </g>
  </svg>
);

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
        <CardTitle className='flex items-center justify-center'>
          <Logo
            className="mr-2 h-10 w-10 text-foreground dark:text-foreground"
            aria-hidden={true}
          />
          Sign In
        </CardTitle>
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