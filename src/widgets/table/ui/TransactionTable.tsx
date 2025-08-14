import React from 'react';
import { Table, TableColumn, TableFilter } from '../../../shared/ui/Table';
import Image from 'next/image';

// Types for transactions
export interface Transaction {
  id: string;
  recipient: string;
  avatar: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
  onTransactionClick?: (transaction: Transaction) => void;
}

// Component to display the recipient's avatar and name
const RecipientCell: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
      <Image
        src={transaction.avatar}
        alt={transaction.recipient}
        className="w-full h-full object-cover"
        width={40}
        height={40}
      />
    </div>
    <span className="text-[#201f24] text-sm font-bold">
      {transaction.recipient}
    </span>
  </div>
);

// Component to display the category
const CategoryCell: React.FC<{ category: string }> = ({ category }) => (
  <span className="text-[#696868] text-xs font-normal">
    {category}
  </span>
);

// Component to display the date
const DateCell: React.FC<{ date: string }> = ({ date }) => (
  <span className="text-[#696868] text-xs font-normal">
    {date}
  </span>
);

// Component to display the formatted amount
const AmountCell: React.FC<{ amount: number; type: 'income' | 'expense' }> = ({ amount, type }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));

  const displayAmount = type === 'expense' ? `-${formattedAmount}` : `+${formattedAmount}`;
  const textColor = type === 'expense' ? 'text-[#201f24]' : 'text-[#277c78]';

  return (
    <div className="flex justify-end w-[200px]">
      <span className={`text-sm font-bold ${textColor}`}>
        {displayAmount}
      </span>
    </div>
  );
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  className = "",
  onTransactionClick,
}) => {
  // Define table columns
  const columns: TableColumn<Transaction>[] = [
    {
      key: 'recipient',
      header: 'Recipient / Sender',
      render: (_, transaction) => <RecipientCell transaction={transaction} />,
      width: 'flex-1',
    },
    {
      key: 'category',
      header: 'Category',
      render: (category) => <CategoryCell category={category} />,
      width: 'w-32',
      sortable: true,
    },
    {
      key: 'date',
      header: 'Transaction Date',
      render: (date) => <DateCell date={date} />,
      width: 'w-40',
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (amount, transaction) => (
        <AmountCell amount={amount} type={transaction.type} />
      ),
      width: 'w-[200px]',
      sortable: true,
    },
  ];

  // Define filters
  const filters: TableFilter[] = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'General', label: 'General' },
        { value: 'Dining Out', label: 'Dining Out' },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Entertainment', label: 'Entertainment' },
      ],
      defaultValue: 'All Transactions',
    },
    {
      key: 'date',
      label: 'Transaction Date',
      options: [
        { value: 'all', label: 'All' },
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'this week', label: 'This Week' },
        { value: 'this month', label: 'This Month' },
        { value: 'this year', label: 'This Year' },
      ],
      defaultValue: 'All',
    }
  ];

  return (
    <Table
      data={transactions}
      columns={columns}
      searchable={true}
      searchPlaceholder="Search transaction"
      filters={filters}
      sortable={true}
      pagination={true}
      itemsPerPage={10}
      className={className}
      onRowClick={onTransactionClick}
    />
  );
};

export default TransactionTable;
