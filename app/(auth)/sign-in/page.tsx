import SignInForm from '@/components/sign-in-form'
import { signIn } from '@/lib/actions/auth'

export default async function SignInPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm action={signIn} />
      </div>
    </div>
  )
}
