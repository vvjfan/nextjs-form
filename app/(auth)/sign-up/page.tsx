import SignUpForm from '@/components/sign-up-form'
import { signUp } from '@/lib/actions/auth'

export default async function SignUpPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm action={signUp} />
      </div>
    </div>
  )
}
