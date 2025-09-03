import { Budget } from '@/shared/ui/BudgetCard/BudgetCard.types';

export const sampleBudgets: Budget[] = [
  {
    id: '1',
    category: 'Entertainment',
    spent: 30.00,
    limit: 50.00,
    color: '#277c78', // green
  },
  {
    id: '2', 
    category: 'Bills',
    spent: 500.00,
    limit: 750.00,
    color: '#82c9d7', // cyan
  },
  {
    id: '3',
    category: 'Dining Out',
    spent: 50.00,
    limit: 75.00,
    color: '#f2cdac', // yellow
  },
  {
    id: '4',
    category: 'Personal Care',
    spent: 20.00,
    limit: 100.00,
    color: '#626070', // navy
  },
];
