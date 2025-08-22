# Button Component

A flexible, reusable button component with multiple variants, sizes, and states.

## Usage

```tsx
import { Button } from '@/shared/ui/Button';

// Basic usage
<Button>Click me</Button>

// With variant
<Button variant="primary">Primary Button</Button>

// With size
<Button size="lg">Large Button</Button>

// With loading state
<Button loading>Loading...</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `leftIcon` | `React.ReactNode` | - | Icon on the left side |
| `rightIcon` | `React.ReactNode` | - | Icon on the right side |
| `fullWidth` | `boolean` | `false` | Makes button full width |
| `disabled` | `boolean` | `false` | Disables the button |

## Variants

- **Primary**: Main action button with dark background (#201f24)
- **Secondary**: Secondary action with beige background (#f8f4f0)
- **Outline**: Outlined button with transparent background and gray border
- **Ghost**: Text-only button with no background or border
- **Destructive**: Destructive actions with red background (#c94736)

## Customization

To customize the button styles to match your Figma design:

1. Update the color classes in the `variants` object in `Button.tsx`
2. Modify the `sizes` object for different dimensions
3. Adjust the `baseStyles` for common styling changes

Example customization:
```tsx
const variants = {
  primary: [
    'bg-your-primary-color',
    'text-white',
    'border-your-primary-color',
    'hover:bg-your-primary-hover',
    // ... other styles
  ],
  // ... other variants
};
```
