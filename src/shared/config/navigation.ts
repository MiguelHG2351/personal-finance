import { IconName } from '@/shared/ui/Icon';

export interface NavigationItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'overview',
    href: '/dashboard'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: 'transactions',
    href: '/dashboard/transactions'
  },
  {
    id: 'budgets',
    label: 'Budgets',
    icon: 'budgets',
    href: '/dashboard/budgets'
  },
  {
    id: 'pots',
    label: 'Pots',
    icon: 'pots',
    href: '/dashboard/pots'
  },
  {
    id: 'recurring-bills',
    label: 'Recurring Bills',
    icon: 'recurring-bills',
    href: '/dashboard/recurring-bills'
  }
];

// Función helper para determinar si un item está activo
export const isNavigationItemActive = (href: string, pathname: string): boolean => {
  if (href === '/dashboard') {
    // Para el dashboard principal, solo activar si es exactamente '/dashboard'
    return pathname === '/dashboard';
  }
  // Para otras rutas, activar si el pathname comienza con el href
  return pathname.startsWith(href);
};
