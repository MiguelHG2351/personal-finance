import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = (
  {
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    disabled,
    ...props
  }
) => {
  const baseStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'font-bold',
    'transition-all',
    'duration-200',
    'rounded-lg',
    'border',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
  ];

  const variants = {
    primary: [
      'bg-grey-900',
      'text-white',
      'border-grey-900',
      'hover:opacity-90',
      'focus:ring-grey-900',
      'active:opacity-80',
    ],
    secondary: [
      'bg-beige-100',
      'text-grey-900',
      'border-beige-100',
      'hover:opacity-80',
      'focus:ring-grey-900',
      'active:opacity-70',
    ],
    outline: [
      'bg-transparent',
      'text-grey-900',
      'border-beige-500',
      'hover:bg-beige-100',
      'hover:border-grey-900',
      'focus:ring-grey-900',
      'active:bg-beige-100',
    ],
    ghost: [
      'bg-transparent',
      'text-grey-500',
      'border-transparent',
      'hover:text-grey-900',
      'focus:ring-grey-900',
      'active:text-grey-900',
    ],
    destructive: [
      'bg-red',
      'text-white',
      'border-red',
      'hover:opacity-90',
      'focus:ring-red',
      'active:opacity-80',
    ],
  };

  const sizes = {
    sm: ['px-3', 'py-1.5', 'text-[0.75rem]', 'leading-[1.5]', 'min-h-[32px]'],
    md: ['px-4', 'py-2', 'text-[0.875rem]', 'leading-[1.5]', 'min-h-[40px]'],
    lg: ['px-6', 'py-3', 'text-[1rem]', 'leading-[1.5]', 'min-h-[48px]'],
  };

  const widthStyles = fullWidth ? ['w-full'] : [];

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        widthStyles,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
