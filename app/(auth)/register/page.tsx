import { Suspense } from 'react'
import { RegisterForm } from '../../../src/features/auth/ui/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[560px] rounded-xl bg-white p-8">
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
      <div className="mt-8 text-center">
        <p className="text-preset-4 text-grey-500">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-grey-900 underline hover:text-grey-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
