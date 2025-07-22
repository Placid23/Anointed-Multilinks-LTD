
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X, Bot, Camera, Bell, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { Badge } from '../ui/badge';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Input } from '../ui/input';

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

const aiToolsLinks = [
  { href: '/ai-assistant', label: 'Conversational Assistant', icon: Bot },
  { href: '/parts-finder', label: 'Image Part Finder', icon: Camera },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Get initial user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    // Clear search query when navigating away from the search page
    if (pathname !== '/search' && searchQuery) {
      setSearchQuery('');
    }
  }, [pathname, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };


  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 gap-2">
        <Link href="/" aria-label="Homepage" className="flex-shrink-0">
          <Logo />
        </Link>
        
        <div className="flex-1 max-w-md hidden md:flex">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Input
              type="search"
              placeholder="Search for parts..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => router.push('/search')}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </form>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors flex-shrink-0">
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary focus:bg-transparent focus:text-primary p-0">
                AI Tools
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {aiToolsLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">2</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex-col items-start gap-1">
                <p className="font-semibold">Your order has shipped!</p>
                <p className="text-xs text-muted-foreground">
                  Your order #12345 has been shipped and is on its way.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  5 minutes ago
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex-col items-start gap-1">
                <p className="font-semibold">Delivery Update</p>
                <p className="text-xs text-muted-foreground">
                  Your package is scheduled for delivery tomorrow.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 hour ago
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                  <Link href="#" className="w-full justify-center">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild aria-label="Shopping Cart">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {isClient && cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{cartItemCount}</Badge>
              )}
            </Link>
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Order History</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                   <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button variant="ghost" size="sm" asChild>
                <Link href="/auth">Login</Link>
            </Button>
          )}
        </div>

        <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" asChild aria-label="Shopping Cart">
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {isClient && cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{cartItemCount}</Badge>
                )}
              </Link>
            </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                 <form onSubmit={handleSearchSubmit} className="w-full relative">
                    <Input
                      type="search"
                      placeholder="Search for parts..."
                      className="w-full pr-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </form>
                {mainNavLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="text-lg font-medium hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
                <p className="text-lg font-medium">AI Tools</p>
                <div className="flex flex-col gap-3 pl-4">
                  {aiToolsLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                 <div className="border-t pt-6 mt-4 flex items-center justify-between">
                    {user ? (
                       <div className='w-full'>
                         <p className="text-sm text-muted-foreground">{user.email}</p>
                         <Button onClick={() => { handleLogout(); closeMobileMenu(); }} variant="outline" className='w-full mt-2'>
                           <LogOut className="mr-2 h-4 w-4" />
                           Logout
                         </Button>
                       </div>
                    ) : (
                      <Button onClick={closeMobileMenu} asChild className='w-full'>
                        <Link href="/auth">Login / Sign Up</Link>
                      </Button>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
