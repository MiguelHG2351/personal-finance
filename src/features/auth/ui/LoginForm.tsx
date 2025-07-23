'use client'

import { useState } from 'react'
import { useSignIn, useSignInWithGoogle } from '../api/authApi'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const signInMutation = useSignIn()
  const signInWithGoogleMutation = useSignInWithGoogle()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInMutation.mutateAsync({ email, password })
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogleMutation.mutateAsync()
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
        disabled={signInWithGoogleMutation.isPending}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {signInWithGoogleMutation.isPending ? 'Conectando...' : 'Continuar con Google'}
      </button>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={signInMutation.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {signInMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {(signInMutation.error || signInWithGoogleMutation.error) && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error al iniciar sesión. Por favor, intenta de nuevo.
        </div>
      )}
    </div>
  )
}
