'use client';
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import { useState } from "react";

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const handleMinimize = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <main className="max-h-screen overflow-hidden h-full bg-beige-100 grid grid-cols-[auto_1fr] grid-rows-[100vh] items-stretch">
      {/* Sidebar */}
      <div className="flex-shrink-0 hidden lg:block">
        <Sidebar 
          isMinimized={isSidebarMinimized}
          onMinimize={handleMinimize}
        />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-0 max-w-[1440px] py-5 sm:px-6 lg:px-5 overflow-y-auto">
        {children}
      </div>
    </main>
  );
}
