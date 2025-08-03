import TransactionTableExample from "@/widgets/TransactionTable/ui/TransactionTableExample";

export default function TransactionsPage() {
  return (
    <section className="flex-1 p-8 lg:p-0">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Transactions</h1>
      <TransactionTableExample />
    </section>
  );
}
