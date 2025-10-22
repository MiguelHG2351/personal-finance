'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems, isNavigationItemActive } from '@/shared/config/navigation';
import { Icon } from '@/shared/ui/Icon';

interface SidebarProps {
  className?: string;
  isMinimized?: boolean;
  onMinimize?: () => void;
}

// TODO: minimized sidebar have left padding

export default function Sidebar({ className = '', isMinimized = false, onMinimize }: SidebarProps) {
  const pathname = usePathname();

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
          className={`relative shrink-0 ${isMinimized ? 'w-8 h-8' : 'w-[121.454px] h-8'} transition-all duration-300`}
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
        className="box-border content-stretch flex flex-col gap-1 items-start justify-start min-h-px min-w-px pl-0 pr-2 py-0 relative shrink-0 w-full"
        data-name="Menu Section"
      >
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`box-border border-l-4 content-stretch cursor-pointer flex flex-row gap-4 h-14 items-center justify-start overflow-visible ${isMinimized ? 'pl-[22px]' : 'px-5'} py-4 relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-full transition-all duration-200 ${
              isNavigationItemActive(item.href, pathname)
                ? 'bg-beige-100 border-green'
                : 'bg-transparent border-transparent hover:bg-[#2a2930] hover:border-transparent'
            }`}
            data-name="Sidebar/Sidebar Menu"
          >
            <Icon
              name={item.icon}
              size="md"
              className={isNavigationItemActive(item.href, pathname) ? 'text-green' : 'text-grey-300'}
            />
            {!isMinimized && (
              <div
                className={`transition-none whitespace-nowrap overflow-hidden basis-0 font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-preset-3 text-left ${
                  isNavigationItemActive(item.href, pathname) ? 'text-gray-900' : 'text-grey-300'
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
      <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start pl-0 pr-6 py-0 relative shrink-0 w-full mt-auto">
        <button
          onClick={onMinimize}
          className="box-border content-stretch cursor-pointer flex flex-row gap-4 h-14 items-center justify-start overflow-visible px-8 py-4 relative shrink-0 w-full transition-all duration-200 hover:bg-[#2a2930]"
          data-name="Minimize Button"
        >
          <Icon
            name="minimize"
            size="sm"
            className="text-grey-300"
          />
          {!isMinimized && (
            <div className="transition-none whitespace-nowrap overflow-hidden basis-0 font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-grey-300 text-preset-3 text-left">
              Minimize Menu
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
