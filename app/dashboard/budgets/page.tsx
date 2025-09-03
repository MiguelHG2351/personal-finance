'use client'

import { Button } from "@/shared/ui/Button";
import { BudgetsList } from "@/shared/ui/BudgetsList";
import SpendingDashboard from "@/widgets/graph/ui/SpendingDashboard";
import { sampleBudgets } from "@/shared/data/budgets";

const BudgetsPage = () => {
  return (
    <div>
      <div className="flex justify-between pb-4">
        <h1 className="text-preset-1">Budgets</h1>
        <Button variant="primary">
          Add New Budget
        </Button>
      </div>
      <div className="lg:flex">
        <section> 
          {/* Graph with the spending summary */}
          <SpendingDashboard />
        </section>
        <section className="lg:w-full lg:ml-8">
          <BudgetsList budgets={sampleBudgets} />
        </section>
      </div>
    </div>
  )
}

export default BudgetsPage
