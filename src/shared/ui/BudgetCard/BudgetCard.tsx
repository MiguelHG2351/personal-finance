import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface BudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  color: string;
  className?: string;
}

const BudgetCard = ({ category, spent, limit, color, className }: BudgetCardProps) => {
    const percentage = Math.min((spent / limit) * 100, 100);
    const remaining = Math.max(limit - spent, 0);

    return (
      <div
        className={cn(
          'bg-white rounded-xl p-5 border border-grey-100',
          className
        )}
      >
        {/* Header with category and color indicator */}
        <div className="flex items-center gap-4 mb-5">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="text-preset-2 text-grey-900 font-bold">
            {category}
          </h3>
        </div>

        {/* Amount spent */}
        <div className="mb-4">
          <p className="text-preset-4 text-grey-500 mb-3">
            Maximum of ${limit.toFixed(2)}
          </p>
          <div className="flex items-center p-1 bg-beige-100">
            <div
              className="h-6 rounded-sm"
              style={{
                backgroundColor: color,
                width: `${percentage}%`,
                minWidth: percentage > 0 ? '8px' : '0px'
              }}
            />
          </div>
        </div>

        {/* Spending details */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col border-l-2 border-grey-100">
            <span className="text-preset-4 text-grey-500">Spent</span>
            <span className="text-preset-3 text-grey-900 font-bold">
              ${spent.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-preset-4 text-grey-500">Remaining</span>
            <span className="text-preset-3 text-grey-900 font-bold">
              ${remaining.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
};

BudgetCard.displayName = 'BudgetCard';

export default BudgetCard;
