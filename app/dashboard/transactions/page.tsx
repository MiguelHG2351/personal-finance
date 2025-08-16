import TransactionTableExample from "@/widgets/table/ui/TransactionTableExample";

export const metadata = {
    title: 'Transactions',
    description: 'Transactions page',
}

export default function TransactionsPage() {
  return (
    <section className="flex-1 p-8 lg:p-0">
      <TransactionTableExample />
    </section>
  );
}
