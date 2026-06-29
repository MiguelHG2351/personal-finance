import { Suspense } from 'react'
import { LoginForm } from '../../../src/features/auth/ui/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
      <div className="w-full max-w-[560px] rounded-xl bg-white p-8">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
        <div className="mt-8 text-center">
          <p className="text-preset-4 text-grey-500">
            Need to create an account?{' '}
            <Link href="/register" className="font-bold text-grey-900 underline hover:text-grey-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
  )
}
