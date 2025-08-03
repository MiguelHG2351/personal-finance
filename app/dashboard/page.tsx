'use client';

import { useState } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import SpendingDashboard from '@/components/SpendingDashboard';
import TransactionTableExample from '@/widgets/TransactionTable/ui/TransactionTableExample';

export default function DashboardPage() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const handleMinimize = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div className="min-h-screen bg-[#f8f4f0] flex">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar 
          isMinimized={isSidebarMinimized} 
          onMinimize={handleMinimize}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Financial Dashboard
          </h1>
          <SpendingDashboard />
          <TransactionTableExample />
        </div>
      </div>
    </div>
  );
}
