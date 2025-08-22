/**
 * Color constants for dropdown components
 * Based on Figma design system
 */
export const DROPDOWN_COLORS = {
  // Primary colors from Figma design system
  primary: '#3f82b2', // blue
  secondary: '#626070', // navy
  success: '#277c78', // green
  warning: '#cab361', // gold
  danger: '#c94736', // red
  
  // Dropdown specific colors
  background: '#ffffff', // white
  border: '#f2f2f2', // grey-100
  hover: '#97a0ac', // navy-grey
  selected: '#82c9d7', // cyan
  text: '#201f24', // grey-900
  textSecondary: '#626070', // navy
  
  // Additional colors from design system
  purple: '#826cb0',
  turquoise: '#597c7c',
  brown: '#93674f',
  magenta: '#934f6f',
  armyGreen: '#7f9161',
  orange: '#be6c49',
  yellow: '#f2cdac',
  
  // State colors
  disabled: '#97a0ac', // navy-grey
  focus: '#3f82b2', // blue
  
  // Shadow
  shadow: 'rgba(32, 31, 36, 0.1)', // based on grey-900
} as const;

/**
 * Type for dropdown color keys
 */
export type DropdownColor = keyof typeof DROPDOWN_COLORS;

/**
 * Helper function to get dropdown color value
 */
export const getDropdownColor = (color: DropdownColor): string => {
  return DROPDOWN_COLORS[color];
};

/**
 * Dropdown color variants for different states
 */
export const DROPDOWN_VARIANTS = {
  default: {
    background: DROPDOWN_COLORS.background,
    text: DROPDOWN_COLORS.text,
    border: DROPDOWN_COLORS.border,
  },
  hover: {
    background: DROPDOWN_COLORS.hover,
    text: DROPDOWN_COLORS.text,
    border: DROPDOWN_COLORS.border,
  },
  selected: {
    background: DROPDOWN_COLORS.selected,
    text: DROPDOWN_COLORS.primary,
    border: DROPDOWN_COLORS.primary,
  },
  disabled: {
    background: DROPDOWN_COLORS.background,
    text: DROPDOWN_COLORS.disabled,
    border: DROPDOWN_COLORS.disabled,
  },
} as const;

export type DropdownVariant = keyof typeof DROPDOWN_VARIANTS;
