'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Dropdown, DropdownOption } from '@/shared/ui/Dropdown';

const categoryOptions: DropdownOption[] = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'dining-out', label: 'Dining Out' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'personal-care', label: 'Personal Care' },
  { value: 'education', label: 'Education' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'general', label: 'General' },
];

const themeOptions: DropdownOption[] = [
  { value: 'green', label: 'Green', colorTag: '#277c78' },
  { value: 'yellow', label: 'Yellow', colorTag: '#f2cdac' },
  { value: 'cyan', label: 'Cyan', colorTag: '#82c9d7' },
  { value: 'navy', label: 'Navy', colorTag: '#626070' },
  { value: 'red', label: 'Red', colorTag: '#c94736' },
  { value: 'purple', label: 'Purple', colorTag: '#826cb0' },
  { value: 'turquoise', label: 'Turquoise', colorTag: '#597c7c' },
  { value: 'brown', label: 'Brown', colorTag: '#93674f' },
  { value: 'magenta', label: 'Magenta', colorTag: '#934f6f' },
  { value: 'blue', label: 'Blue', colorTag: '#3f82b2' },
  { value: 'navy-grey', label: 'Navy Grey', colorTag: '#97a0ac' },
  { value: 'army-green', label: 'Army Green', colorTag: '#7f9161' },
  { value: 'gold', label: 'Gold', colorTag: '#cab361' },
  { value: 'orange', label: 'Orange', colorTag: '#be6c49' },
];

interface AddBudgetFormProps {
  onClose?: () => void;
  onSubmit?: (data: { category: string; maxSpend: string; theme: string }) => void;
}

export function AddBudgetForm({ onClose, onSubmit }: AddBudgetFormProps) {
  const [category, setCategory] = useState('');
  const [maxSpend, setMaxSpend] = useState('');
  const [theme, setTheme] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ category, maxSpend, theme });
  };

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
            placeholder="Select a category"
            onChange={setCategory}
          />

          <div className="flex flex-col gap-1">
            <label className="text-[length:var(--text-preset-5)] font-[var(--text-preset-5--font-weight,700)] leading-[var(--text-preset-5--line-height)] text-grey-500">
              Maximum Spend
            </label>
            <div className="bg-white border border-beige-500 rounded-lg px-5 py-3 flex items-center gap-3">
              <span className="text-[length:var(--text-preset-4)] leading-[var(--text-preset-4--line-height)] text-beige-500">
                $
              </span>
              <input
                type="text"
                placeholder="e.g. 2000"
                value={maxSpend}
                onChange={(e) => setMaxSpend(e.target.value)}
                className="flex-1 text-[length:var(--text-preset-4)] leading-[var(--text-preset-4--line-height)] text-grey-900 placeholder:text-beige-500 outline-none"
              />
            </div>
          </div>

          <Dropdown
            label="Theme"
            options={themeOptions}
            value={theme}
            placeholder="Select a theme"
            onChange={setTheme}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-grey-900 text-white rounded-lg px-4 py-4 text-[length:var(--text-preset-4)] font-[var(--text-preset-4--font-weight,700)] leading-[var(--text-preset-4--line-height)] hover:opacity-90 transition-opacity"
        >
          Add Budget
        </button>
      </form>
    </div>
  );
}
