# Dropdown Component

Componente de dropdown personalizado siguiendo el diseño de Figma para la aplicación de finanzas personales.

## Características

- ✅ Diseño fiel al mockup de Figma
- ✅ Soporte para color tags (círculos de color)
- ✅ Accesibilidad con teclado (Enter, Space, Escape)
- ✅ Cierre automático al hacer clic fuera
- ✅ Estados hover y focus
- ✅ Scroll para listas largas
- ✅ Estado deshabilitado
- ✅ Usa colores de Tailwind 4 configurados en globals.css

## Uso

```tsx
import { Dropdown, DropdownOption } from '@/shared/ui/Dropdown';

const categoryOptions: DropdownOption[] = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills' },
  { value: 'groceries', label: 'Groceries' },
];

function MyComponent() {
  const [category, setCategory] = useState('');

  return (
    <Dropdown
      label="Budget Category"
      options={categoryOptions}
      value={category}
      placeholder="Select a category"
      onChange={setCategory}
    />
  );
}
```

## Con Color Tags

```tsx
const themeOptions: DropdownOption[] = [
  { value: 'green', label: 'Green', colorTag: '#277c78' },
  { value: 'yellow', label: 'Yellow', colorTag: '#f2cdac' },
  { value: 'cyan', label: 'Cyan', colorTag: '#82c9d7' },
];

<Dropdown
  label="Theme"
  options={themeOptions}
  value={theme}
  onChange={setTheme}
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | - | Etiqueta del campo (requerido) |
| `options` | `DropdownOption[]` | - | Array de opciones (requerido) |
| `value` | `string` | `undefined` | Valor seleccionado |
| `placeholder` | `string` | `'Seleccionar...'` | Texto cuando no hay selección |
| `onChange` | `(value: string) => void` | `undefined` | Callback cuando cambia la selección |
| `disabled` | `boolean` | `false` | Deshabilitar el dropdown |
| `className` | `string` | `''` | Clases CSS adicionales |

## Tipo DropdownOption

```typescript
interface DropdownOption {
  value: string;        // Valor único del option
  label: string;        // Texto a mostrar
  colorTag?: string;    // Hex color para círculo (opcional)
}
```

## Estilos

El componente usa las siguientes variables CSS de Tailwind 4 definidas en `globals.css`:

- **Colores**: `grey-900`, `grey-500`, `beige-500`, `beige-100`, `white`
- **Typography**: `text-preset-4`, `text-preset-5`
- **Espaciado**: Padding y gaps según diseño de Figma

## Accesibilidad

- ✅ Navegación con teclado (Enter/Space para abrir, Escape para cerrar)
- ✅ Cierre automático al hacer clic fuera
- ✅ Estados visuales claros (hover, active, disabled)
- ✅ Labels semánticos

## Ejemplos

Ver `Dropdown.stories.tsx` para más ejemplos de uso.
