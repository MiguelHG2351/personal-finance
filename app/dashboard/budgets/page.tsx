import { BudgetsList } from "@/shared/ui/BudgetsList";
import SpendingDashboard from "@/widgets/graph/ui/SpendingDashboard";
import { sampleBudgets } from "@/shared/data/budgets";
import { AddBudgetButton } from "@/features/add-budget";

const BudgetsPage = () => {
  return (
    <>
      <div className="flex justify-between pb-4">
        <h1 className="text-preset-1">Budgets</h1>
        <AddBudgetButton />
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
    </>
  )
}

export default BudgetsPage
