'use client';
import React from 'react';
import { TransactionTable, Transaction } from './TransactionTable';

// Datos de muestra basados en el diseño de Figma
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    recipient: 'Emma Richardson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '19 Aug 2024',
    amount: 75.50,
    type: 'income',
  },
  {
    id: '2',
    recipient: 'Savory Bites Bistro',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=40&h=40&fit=crop&crop=center',
    category: 'Dining Out',
    date: '19 Aug 2024',
    amount: 55.50,
    type: 'expense',
  },
  {
    id: '3',
    recipient: 'Daniel Carter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '18 Aug 2024',
    amount: 42.30,
    type: 'expense',
  },
  {
    id: '4',
    recipient: 'Sun Park',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '17 Aug 2024',
    amount: 120.00,
    type: 'income',
  },
  {
    id: '5',
    recipient: 'Urban Services Hub',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=center',
    category: 'General',
    date: '17 Aug 2024',
    amount: 65.00,
    type: 'expense',
  },
  {
    id: '6',
    recipient: 'Liam Hughes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    category: 'Groceries',
    date: '15 Aug 2024',
    amount: 65.75,
    type: 'income',
  },
  {
    id: '7',
    recipient: 'Lily Ramirez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '14 Aug 2024',
    amount: 50.00,
    type: 'income',
  },
  {
    id: '8',
    recipient: 'Ethan Clark',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    category: 'Dining Out',
    date: '13 Aug 2024',
    amount: 32.50,
    type: 'expense',
  },
  {
    id: '9',
    recipient: 'James Thompson',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face',
    category: 'Entertainment',
    date: '11 Aug 2024',
    amount: 5.00,
    type: 'expense',
  },
  {
    id: '10',
    recipient: 'Pixel Playground',
    avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop&crop=center',
    category: 'Entertainment',
    date: '11 Aug 2024',
    amount: 10.00,
    type: 'expense',
  },
//   add more transactions
  {
    id: '11',
    recipient: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '11 Aug 2024',
    amount: 10.00,
    type: 'expense',
  },
  {
    id: '12',
    recipient: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '11 Aug 2025',
    amount: 10.00,
    type: 'expense',
  },
  {
    id: '13',
    recipient: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '11 Aug 2024',
    amount: 10.00,
    type: 'expense',
  },
  {
    id: '14',
    recipient: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    category: 'General',
    date: '11 Aug 2024',
    amount: 10.00,
    type: 'expense',
  },
];

export const TransactionTableExample: React.FC = () => {
  const handleTransactionClick = (transaction: Transaction) => {
    console.log('Transacción seleccionada:', transaction);
    // Aquí puedes agregar la lógica para manejar el clic en una transacción
  };

  return (
    <div className="p-6 bg-[#f8f4f0] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#201f24] mb-6">
          Transaction Table
        </h1>
        <TransactionTable
          transactions={sampleTransactions}
          onTransactionClick={handleTransactionClick}
        />
      </div>
    </div>
  );
};

export default TransactionTableExample;
