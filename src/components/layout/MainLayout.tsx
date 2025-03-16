
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, FileText, BarChart3, Users, Settings, LogOut, Sun, Moon, BellRing } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
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

  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { title: 'Assessments', href: '/assessments', icon: <FileText className="h-5 w-5" /> },
    { title: 'Analytics', href: '/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { title: 'Users', href: '/users', icon: <Users className="h-5 w-5" />, roles: ['admin', 'super-admin'] },
    { title: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> }
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    item => !item.roles || (userRole && item.roles.includes(userRole))
  );
  
  // Navigation component that works for both sidebar and mobile nav
  const Navigation = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={cn(
      "flex flex-col gap-1",
      mobile ? "mt-8" : "mt-8"
    )}>
      {filteredNavItems.map((item) => (
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
                  <Navigation mobile={true} />
                </SheetContent>
              </Sheet>
            )}
            <Logo size={isMobile ? "sm" : "md"} />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {isAuthenticated && (
              <>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <BellRing className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    3
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          admin@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center text-destructive">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content with optional sidebar */}
      <div className="flex-1 flex">
        {isAuthenticated && !isMobile && (
          <aside className="w-64 border-r bg-sidebar px-4 py-6 hidden md:block">
            <Navigation />
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
