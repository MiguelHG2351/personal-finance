export interface BudgetLatestSpendingItem {
  id: string
  name: string
  avatarUrl: string | null
  amount: number
  date: string
  currency: string
}

export interface BudgetCardProps {
  category: string
  spent: number
  limit: number
  /** CSS color (hex) used for the dot, progress bar and accents. */
  color: string
  /** Currency code (e.g. 'USD', 'NIO') for all amounts in this card. */
  currency: string
  latestSpending?: BudgetLatestSpendingItem[]
  onDelete?: () => void
  className?: string
}
