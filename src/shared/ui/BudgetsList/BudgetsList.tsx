import React from 'react';
import { BudgetCard } from '@/shared/ui/BudgetCard';
import { Budget } from '@/shared/ui/BudgetCard/BudgetCard.types';
import { cn } from '@/shared/lib/utils';

export interface BudgetsListProps {
  budgets: Budget[];
  className?: string;
}

const BudgetsList = ({ budgets, className }: BudgetsListProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        className
      )}
    > 
      <div className="flex flex-col gap-6">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            category={budget.category}
            spent={budget.spent}
            limit={budget.limit}
            color={budget.color}
          />
        ))}
      </div>
    </div>
  );
};

BudgetsList.displayName = 'BudgetsList';

export default BudgetsList;
