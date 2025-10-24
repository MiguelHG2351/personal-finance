'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  colorTag?: string; // Color hex para mostrar un círculo de color
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  label,
  options,
  value,
  placeholder = 'Seleccionar...',
  onChange,
  disabled = false,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`} ref={dropdownRef}>
      {/* Label */}
      <label className="text-[length:var(--text-preset-5)] font-[var(--text-preset-5--font-weight,700)] leading-[var(--text-preset-5--line-height)] text-grey-500">
        {label}
      </label>

      {/* Dropdown Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full bg-white border border-beige-500 rounded-lg
            px-5 py-3 flex items-center justify-between gap-4
            text-[length:var(--text-preset-4)] leading-[var(--text-preset-4--line-height)]
            transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-grey-900'}
            ${isOpen ? 'border-grey-900' : ''}
          `}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {selectedOption?.colorTag && (
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: selectedOption.colorTag }}
              />
            )}
            <span
              className={`truncate ${selectedOption ? 'text-grey-900' : 'text-beige-500'}`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-grey-900 transition-transform shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-beige-500 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-5 py-3 flex items-center gap-3
                  text-[length:var(--text-preset-4)] leading-[var(--text-preset-4--line-height)]
                  text-left transition-colors
                  hover:bg-beige-100
                  ${value === option.value ? 'bg-beige-100 font-bold' : 'font-normal'}
                `}
              >
                {option.colorTag && (
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: option.colorTag }}
                  />
                )}
                <span className="text-grey-900 truncate">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
