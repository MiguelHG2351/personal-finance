import { RegisterForm } from '../../../src/features/auth/ui/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Únete a Finanzas Personales
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-grey-900 hover:text-grey-500">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
