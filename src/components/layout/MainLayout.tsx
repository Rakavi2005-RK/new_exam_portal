
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Navigation } from './Navigation';
import { HeaderActions } from './HeaderActions';
import { navItems } from './nav-items';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    // Check if user is on a non-public route
    const isPrivateRoute = !['/', '/login', '/register'].includes(location.pathname);
    setIsAuthenticated(isPrivateRoute);
    
    // Set a sample role for demo purposes
    if (isPrivateRoute) {
      setUserRole('admin');
    }
    
    // For dark mode detection
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Page transition effect
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 300);
    
    return () => clearTimeout(timer);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    item => !item.roles || (userRole && item.roles.includes(userRole))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            {isAuthenticated && isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <Logo />
                  <Navigation items={filteredNavItems} mobile={true} />
                </SheetContent>
              </Sheet>
            )}
            <Logo size={isMobile ? "sm" : "md"} />
          </div>
          
          <HeaderActions 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </header>
      
      {/* Main content with optional sidebar */}
      <div className="flex-1 flex">
        {isAuthenticated && !isMobile && (
          <aside className="w-64 border-r bg-sidebar px-4 py-6 hidden md:block">
            <Navigation items={filteredNavItems} />
          </aside>
        )}
        
        <main className={cn(
          "flex-1 py-6 px-6", 
          pageTransition ? "page-transition-enter page-transition-enter-active" : ""
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
