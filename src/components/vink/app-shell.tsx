'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, ShieldAlert, Settings, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/threat-log', label: 'Threat Log', icon: ShieldAlert },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 rounded-lg transition-colors duration-200 text-muted-foreground hover:text-primary',
        isActive && 'text-primary bg-primary/10',
      )}
    >
      <Icon className="w-6 h-6 md:w-5 md:h-5" />
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </Link>
  );
}

function VinkLogo() {
    return <h1 className="font-headline text-2xl font-bold text-primary tracking-widest">VINK</h1>
}

function UserProfile() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('vink-auth');
    router.push('/');
  }

  return (
    <div className="flex items-center gap-2">
       <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
         <LogOut className="w-5 h-5" />
       </Button>
    </div>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 glass-card rounded-r-none flex-col border-r hidden md:flex">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <VinkLogo />
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} isActive={pathname === item.href} />
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-primary/10">
            <UserProfile />
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('vink-auth');
    router.push('/');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 md:hidden h-20 glass-card border-t rounded-t-2xl">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} isActive={pathname === item.href} />
        ))}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground">
            <LogOut className="w-6 h-6" />
            <span className="text-xs">Log Out</span>
        </button>
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full md:pl-64">
      {isMobile ? <MobileNav pathname={pathname} /> : <DesktopNav pathname={pathname} />}
      <main className="flex flex-1 flex-col p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
