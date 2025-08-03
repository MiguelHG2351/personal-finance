'use client';

import SpendingDashboard from '@/components/SpendingDashboard';
import TransactionTableExample from '@/widgets/TransactionTable/ui/TransactionTableExample';

export default function DashboardPage() {
  return (
    <section className="flex-1 p-8 lg:p-0">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Financial Dashboard
      </h1>
      <SpendingDashboard />
      <TransactionTableExample />
    </section>
  );
}
