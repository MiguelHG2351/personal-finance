import { LoginForm } from '../../src/features/auth/ui/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
