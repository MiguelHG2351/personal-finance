import Image from 'next/image'
import { LoginForm } from '../../src/features/auth/ui/LoginForm'
import AuthIllustration from '@/entities/transaction/assets/login_illustration.svg'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="max-h-screen h-full bg-beige-100 flex items-stretch py-5 sm:px-6 lg:px-5 max-w-[1440px] gap-x-4">
      <section className="relative max-w-[560px] w-full bg-grey-900 rounded-xl overflow-hidden hidden lg:block">
        <div className="absolute inset-0 p-10 flex flex-col justify-between">
          <Image src="/logo.svg" alt="Logo" width={122} height={22} />

          <div>
            <h1 className="text-white text-preset-1 font-bold mb-6">Keep track of your money and save for your future</h1>
            <p className="text-white text-preset-4">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
          </div>
        </div>
        <Image
          src={AuthIllustration}
          alt="Login Illustration"
          width={0}
          height={0}
          priority
          sizes="(min-width: 1024px) 500px, (min-width: 768px) 100vw, 100vw"
          className="w-full h-auto"
        />
      </section>
      <section className="flex-1 shrink-0 flex flex-col justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Finanzas Personales
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gestiona tus finanzas de manera inteligente
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="font-medium text-grey-900 hover:text-grey-500">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
