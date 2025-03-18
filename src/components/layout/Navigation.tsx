
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

interface NavigationProps {
  items: NavItem[];
  mobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ items, mobile = false }) => {
  const location = useLocation();

  return (
    <nav className={cn(
      "flex flex-col gap-1",
      mobile ? "mt-8" : "mt-8"
    )}>
      {items.map((item) => (
        <Link 
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            location.pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:bg-primary/10 hover:text-foreground",
            mobile ? "text-base" : "text-sm"
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};
