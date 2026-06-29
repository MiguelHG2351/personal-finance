'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  required?: boolean
}

export function PasswordField({ id, label, value, onChange, autoComplete, required }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-preset-5 font-bold text-grey-500">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-beige-500 bg-white px-5 py-3 transition-colors focus-within:border-grey-900">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-preset-4 text-grey-900 outline-none"
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((value) => !value)}
          className="ml-3 text-grey-900 hover:text-grey-500"
        >
          {showPassword ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
        </button>
      </div>
    </div>
  )
}
