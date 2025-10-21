'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems, isNavigationItemActive } from '@/shared/config/navigation';
import { Icon } from '@/shared/ui/Icon';

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-grey-900 border-t border-beige-500 px-4 pt-2 @container">
      <div className="flex justify-around items-stretch">
        {navigationItems.map((item) => {
          const isActive = isNavigationItemActive(item.href, pathname);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`rounded-t-xl min-w-16 shrink-0 flex flex-col gap-x-4 items-center justify-center py-2 px-4 transition-colors duration-200 border-b-4 @xl:min-w-22 ${isActive ? 'bg-beige-100 border-b-green' : 'border-b-transparent hover:bg-grey-500/10'}`}
              // suppressHydrationWarning
            >
              <div className={`mb-1 transition-all duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
                <Icon
                  name={item.icon}
                  size="md"
                  className={`transition-opacity duration-200 ${isActive ? 'text-green opacity-100' : 'opacity-60 text-grey-300 hover:opacity-80'}`}
                />
              </div>
              <span
                className={`text-preset-5 font-bold transition-colors duration-200 text-center leading-tight sr-only @xl:not-sr-only ${isActive
                  ? 'text-grey-900'
                  : 'text-grey-300 hover:text-white'
                  }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
