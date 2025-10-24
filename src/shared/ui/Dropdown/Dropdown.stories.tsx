import { Dropdown, DropdownOption } from './Dropdown';

// Ejemplo de uso básico
export default function DropdownExamples() {
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

  return (
    <div className="max-w-xl mx-auto p-8 space-y-8">
      <h1 className="text-[length:var(--text-preset-1)] font-[var(--text-preset-1--font-weight)] leading-[var(--text-preset-1--line-height)] text-grey-900">
        Dropdown Component Examples
      </h1>

      {/* Dropdown sin color tag */}
      <div>
        <h2 className="text-[length:var(--text-preset-2)] font-[var(--text-preset-2--font-weight)] mb-4 text-grey-900">
          Budget Category
        </h2>
        <Dropdown
          label="Budget Category"
          options={categoryOptions}
          placeholder="Select a category"
          onChange={(value) => console.log('Selected category:', value)}
        />
      </div>

      {/* Dropdown con color tag */}
      <div>
        <h2 className="text-[length:var(--text-preset-2)] font-[var(--text-preset-2--font-weight)] mb-4 text-grey-900">
          Theme
        </h2>
        <Dropdown
          label="Theme"
          options={themeOptions}
          placeholder="Select a theme"
          onChange={(value) => console.log('Selected theme:', value)}
        />
      </div>

      {/* Dropdown con valor pre-seleccionado */}
      <div>
        <h2 className="text-[length:var(--text-preset-2)] font-[var(--text-preset-2--font-weight)] mb-4 text-grey-900">
          Pre-selected Value
        </h2>
        <Dropdown
          label="Theme"
          options={themeOptions}
          value="green"
          onChange={(value) => console.log('Selected theme:', value)}
        />
      </div>

      {/* Dropdown deshabilitado */}
      <div>
        <h2 className="text-[length:var(--text-preset-2)] font-[var(--text-preset-2--font-weight)] mb-4 text-grey-900">
          Disabled
        </h2>
        <Dropdown
          label="Budget Category"
          options={categoryOptions}
          value="entertainment"
          disabled
        />
      </div>
    </div>
  );
}
