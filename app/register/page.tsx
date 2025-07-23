export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Únete a Finanzas Personales
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="text-gray-600">
              Página de registro en construcción
            </p>
            <div className="mt-6">
              <a 
                href="/login" 
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ← Volver al Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
