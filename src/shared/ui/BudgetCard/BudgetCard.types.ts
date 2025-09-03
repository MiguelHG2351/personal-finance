export interface BudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  color: string;
  className?: string;
}

export interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  color: string;
}
