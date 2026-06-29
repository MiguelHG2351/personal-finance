'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSignIn, useSignInWithGoogle } from '../api/authApi'
import { GoogleAuthButton } from './GoogleAuthButton'
import { PasswordField } from './PasswordField'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const signInMutation = useSignIn()
  const signInWithGoogleMutation = useSignInWithGoogle()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInMutation.mutateAsync({ email, password })
      router.push(next)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogleMutation.mutateAsync({ next })
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-preset-1 font-bold text-grey-900">Login</h1>

      <GoogleAuthButton
        onClick={handleGoogleSignIn}
        pending={signInWithGoogleMutation.isPending}
        label="Login with Google"
      />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-beige-500" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-preset-5 text-grey-500">Or login with email</span>
        </div>
      </div>

      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-preset-5 font-bold text-grey-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="block w-full rounded-lg border border-beige-500 bg-white px-5 py-3 text-preset-4 text-grey-900 outline-none transition-colors focus:border-grey-900"
          />
        </div>

        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={signInMutation.isPending}
          className="mt-8 flex w-full justify-center rounded-lg bg-grey-900 p-4 text-preset-4 font-bold text-white transition-colors hover:bg-grey-500 focus:outline-none focus:ring-2 focus:ring-grey-900 focus:ring-offset-2 disabled:opacity-50"
        >
          {signInMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {(signInMutation.error || signInWithGoogleMutation.error) && (
        <div className="mt-4 rounded-lg border border-red bg-red/10 p-3 text-preset-4 text-red">
          Error signing in. Please check your credentials and try again.
        </div>
      )}
    </div>
  )
}
