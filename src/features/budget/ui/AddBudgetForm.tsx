'use client';

import { useState } from 'react';
import { Dropdown, DropdownOption } from '@/shared/ui/Dropdown';
import { CURRENCIES, currencySymbol } from '@/shared/lib/currency';
import { useCategories } from '@/entities/budget';

const themeOptions: DropdownOption[] = [
  { value: '#277c78', label: 'Green', colorTag: '#277c78' },
  { value: '#f2cdac', label: 'Yellow', colorTag: '#f2cdac' },
  { value: '#82c9d7', label: 'Cyan', colorTag: '#82c9d7' },
  { value: '#626070', label: 'Navy', colorTag: '#626070' },
  { value: '#c94736', label: 'Red', colorTag: '#c94736' },
  { value: '#826cb0', label: 'Purple', colorTag: '#826cb0' },
  { value: '#597c7c', label: 'Turquoise', colorTag: '#597c7c' },
  { value: '#93674f', label: 'Brown', colorTag: '#93674f' },
  { value: '#934f6f', label: 'Magenta', colorTag: '#934f6f' },
  { value: '#3f82b2', label: 'Blue', colorTag: '#3f82b2' },
  { value: '#97a0ac', label: 'Navy Grey', colorTag: '#97a0ac' },
  { value: '#7f9161', label: 'Army Green', colorTag: '#7f9161' },
  { value: '#cab361', label: 'Gold', colorTag: '#cab361' },
  { value: '#be6c49', label: 'Orange', colorTag: '#be6c49' },
];

const currencyOptions: DropdownOption[] = CURRENCIES.map((c) => ({
  value: c.code,
  label: `${c.label} (${c.symbol})`,
}));

export interface AddBudgetFormData {
  category_id: number;
  maximum: number;
  theme: string;
  currency: string;
}

interface AddBudgetFormProps {
  onSubmit?: (data: AddBudgetFormData) => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export function AddBudgetForm({ onSubmit, isSubmitting = false, error }: AddBudgetFormProps) {
  const [category, setCategory] = useState('');
  const [maxSpend, setMaxSpend] = useState('');
  const [theme, setTheme] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const categoryOptions: DropdownOption[] = categories.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const maximum = Number(maxSpend);

    if (!category) {
      setValidationError('Please choose a category.');
      return;
    }
    if (!theme) {
      setValidationError('Please choose a theme.');
      return;
    }
    if (!Number.isFinite(maximum) || maximum <= 0) {
      setValidationError('Maximum spend must be a number greater than 0.');
      return;
    }
    if (!currency) {
      setValidationError('Please choose a currency.');
      return;
    }

    onSubmit?.({ category_id: Number(category), maximum, theme, currency });
  };

  const message = validationError ?? error;

  return (
    <div className="flex items-center justify-center p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl max-w-[560px] w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-4">
          <Dropdown
            label="Budget Category"
            options={categoryOptions}
            value={category}
            placeholder={categoriesLoading ? 'Loading categories…' : 'Select a category'}
            onChange={setCategory}
            disabled={categoriesLoading}
          />

          <div className="flex flex-col gap-1">
            <label className="text-[length:var(--text-preset-5)] font-[var(--text-preset-5--font-weight,700)] leading-[var(--text-preset-5--line-height)] text-grey-500">
              Maximum Spend
            </label>
            <div className="bg-white border border-beige-500 rounded-lg px-5 py-3 flex items-center gap-3">
              <span className="text-[length:var(--text-preset-4)] leading-[var(--text-preset-4--line-height)] text-beige-500">
                {currencySymbol(currency)}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="e.g. 2000"
                value={maxSpend}
                onChange={(e) => setMaxSpend(e.target.value)}
                className="flex-1 text-[length:var(--text-preset-4)] leading-[var(--text-preset-4--line-height)] text-grey-900 placeholder:text-beige-500 outline-none"
              />
            </div>
          </div>

          <Dropdown
            label="Currency"
            options={currencyOptions}
            value={currency}
            placeholder="Select a currency"
            onChange={setCurrency}
          />

          <Dropdown
            label="Theme"
            options={themeOptions}
            value={theme}
            placeholder="Select a theme"
            onChange={setTheme}
          />
        </div>

        {message && (
          <p className="text-preset-5 text-red">{message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-grey-900 text-white rounded-lg px-4 py-4 text-[length:var(--text-preset-4)] font-[var(--text-preset-4--font-weight,700)] leading-[var(--text-preset-4--line-height)] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? 'Adding…' : 'Add Budget'}
        </button>
      </form>
    </div>
  );
}
