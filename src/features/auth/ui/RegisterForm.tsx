'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSignUp, useSignInWithGoogle } from '../api/authApi'
import { GoogleAuthButton } from './GoogleAuthButton'
import { PasswordField } from './PasswordField'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const signUpMutation = useSignUp()
  const signUpWithGoogleMutation = useSignInWithGoogle()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.')
      return
    }

    signUpMutation.mutate(
      { email, password, fullName },
      { onSuccess: () => router.push(next) }
    )
  }

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogleMutation.mutateAsync({ next })
    } catch (error) {
      console.error('Error signing up with Google:', error)
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-preset-1 font-bold text-grey-900">Sign Up</h1>

      <GoogleAuthButton
        onClick={handleGoogleSignUp}
        pending={signUpWithGoogleMutation.isPending}
        label="Sign up with Google"
      />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-beige-500" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-preset-5 text-grey-500">Or sign up with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-preset-5 font-bold text-grey-500">
            Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
            className="block w-full rounded-lg border border-beige-500 bg-white px-5 py-3 text-preset-4 text-grey-900 outline-none transition-colors focus:border-grey-900"
          />
        </div>

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
          label="Create Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          required
        />

        <button
          type="submit"
          disabled={signUpMutation.isPending}
          className="mt-8 flex w-full justify-center rounded-lg bg-grey-900 p-4 text-preset-4 font-bold text-white transition-colors hover:bg-grey-500 focus:outline-none focus:ring-2 focus:ring-grey-900 focus:ring-offset-2 disabled:opacity-50"
        >
          {signUpMutation.isPending ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {(validationError || signUpMutation.error || signUpWithGoogleMutation.error) && (
        <div className="mt-4 rounded-lg border border-red bg-red/10 p-3 text-preset-4 text-red">
          {validationError ?? 'Error creating your account. Please try again.'}
        </div>
      )}
    </div>
  )
}
