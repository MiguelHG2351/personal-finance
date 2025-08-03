'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Assets locales del diseño de Figma
const overviewIcon = "/icons/overview-icon.svg";
const transactionsIcon = "/icons/transactions-icon.svg";
const budgetsIcon = "/icons/budgets-icon.svg";
const potsIcon = "/icons/pots-icon.svg";
const recurringBillsIcon = "/icons/recurring-bills-icon.svg";
const minimizeIcon = "/icons/minimize-icon.svg";

interface SidebarProps {
  className?: string;
  isMinimized?: boolean;
  onMinimize?: () => void;
}

// TODO: minimized sidebar have left padding

export default function Sidebar({ className = '', isMinimized = false, onMinimize }: SidebarProps) {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: overviewIcon,
      href: '/dashboard',
      isActive: true
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: transactionsIcon,
      href: '/dashboard/transactions',
      isActive: false
    },
    {
      id: 'budgets',
      label: 'Budgets',
      icon: budgetsIcon,
      href: '/dashboard/budgets',
      isActive: false
    },
    {
      id: 'pots',
      label: 'Pots',
      icon: potsIcon,
      href: '/dashboard/pots',
      isActive: false
    },
    {
      id: 'recurring-bills',
      label: 'Recurring Bills',
      icon: recurringBillsIcon,
      href: '/dashboard/recurring-bills',
      isActive: false
    }
  ];

  return (
    <div
      className={`bg-[#201f24] box-border content-stretch flex flex-col gap-6 items-start justify-start overflow-clip pb-6 pt-0 px-0 relative rounded-br-[16px] rounded-tr-[16px] h-full ${
        isMinimized ? 'w-20' : 'w-[300px]'
      } transition-all duration-300 ${className}`}
      data-name="Sidebar/Sidebar"
    >
      {/* Logo Section */}
      <div
        className="box-border content-stretch flex flex-col gap-2 items-start justify-center overflow-clip px-8 py-10 relative shrink-0 w-full"
        data-name="Logo"
      >
        <div
          className={`relative shrink-0 ${isMinimized ? 'w-8 h-8' : 'w-[121.454px] h-[21.76px]'} transition-all duration-300`}
          data-name="Logo"
        >
          <Image 
            alt="Finance Logo" 
            className="block max-w-none size-full object-contain" 
            src={isMinimized ? "/icons/minimized-logo.svg" : "/logo.svg"}
            width={isMinimized ? 14 : 122}
            height={isMinimized ? 22 : 22}
            priority
          />
        </div>
      </div>

      {/* Menu Section */}
      <div
        className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start max-h-[800px] min-h-px min-w-px pl-0 pr-6 py-0 relative shrink-0 w-full"
        data-name="Menu Section"
      >
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`box-border content-stretch cursor-pointer flex flex-row gap-4 h-14 items-center justify-start overflow-visible px-8 py-4 relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-full transition-all duration-200 hover:bg-[#2a2930] ${
              item.isActive 
                ? 'bg-[#f8f4f0]' 
                : 'bg-transparent'
            }`}
            data-name="Sidebar/Sidebar Menu"
          >
            <div className="overflow-clip relative shrink-0 size-6">
              <Image 
                alt={`${item.label} icon`} 
                className="block max-w-none size-full" 
                src={item.icon}
                width={24}
                height={24}
              />
            </div>
            {!isMinimized && (
              <div
                className={`basis-0 font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-preset-3 text-left ${
                  item.isActive ? 'text-[#201f24]' : 'text-[#b3b3b3]'
                }`}
              >
                <span>
                    {item.label}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Minimize Button */}
      <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start pl-0 pr-6 py-0 relative shrink-0 w-full">
        <button
          onClick={onMinimize}
          className="box-border content-stretch cursor-pointer flex flex-row gap-4 h-14 items-center justify-start overflow-visible px-8 py-4 relative shrink-0 w-full transition-all duration-200 hover:bg-[#2a2930]"
          data-name="Minimize Button"
        >
          <div className="overflow-clip relative shrink-0 size-4">
            <Image 
              alt="Minimize menu icon" 
              className="block max-w-none size-full" 
              src={minimizeIcon}
              width={24}
              height={24}
            />
          </div>
          {!isMinimized && (
            <div className="basis-0 font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[#b3b3b3] text-preset-3 text-left">
              Minimize Menu
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
