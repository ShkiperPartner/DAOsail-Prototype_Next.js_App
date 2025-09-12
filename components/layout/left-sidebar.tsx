'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { menuItems } from '@/data/menu';
import { useAppContext } from '@/lib/contexts/app-context';

export function LeftSidebar() {
  const pathname = usePathname();
  const { language } = useAppContext();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-muted/50 h-full">
      <div className="flex-1 overflow-auto custom-scrollbar p-4">
        <nav className="space-y-2" role="navigation" aria-label="Main navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (pathname.startsWith(item.href) && item.href !== '/');
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'sidebar-link',
                  isActive && 'active'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="font-medium">
                  {language === 'ru' ? item.labelRu : item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}