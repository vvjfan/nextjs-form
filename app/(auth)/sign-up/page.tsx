import type { Metadata } from 'next'
import SignUpForm from '@/components/sign-up-form'
import { signUp } from '@/lib/actions/auth'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account to get started',
}

export default function SignUpPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm action={signUp} />
      </div>
    </div>
  )
}
