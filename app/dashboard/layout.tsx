'use client';
import { BottomNavigation } from "@/widgets/bottomNavigation";
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
    <main className="max-h-screen relative lg:overflow-hidden h-full bg-beige-100 block lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[100vh] lg:items-stretch">
      {/* Sidebar */}
      <section className="flex-shrink-0 hidden lg:block">
        <Sidebar
          isMinimized={isSidebarMinimized}
          onMinimize={handleMinimize}
        />
      </section>
      {/* Main Content */}
      <section className="flex-1 p-8 py-5 sm:px-6 lg:px-5 overflow-y-auto">
        <div className="max-w-[1440px] mx-auto">
          {children}
        </div>
      </section>
      {/* Bottom Navigation - Solo en móviles */}
      <section className="flex lg:hidden sticky bottom-0">
        <BottomNavigation />
      </section>
    </main>
  );
}
