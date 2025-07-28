import { LoginForm } from '../../../src/features/auth/ui/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
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
    </>
  )
}
