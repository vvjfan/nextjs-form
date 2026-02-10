import type { Metadata } from 'next'
import SignInForm from '@/components/sign-in-form'
import { signIn } from '@/lib/actions/auth'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account to continue',
}

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm action={signIn} />
      </div>
    </div>
  )
}
