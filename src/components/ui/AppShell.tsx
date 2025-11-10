'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/libs/cn';
import { getRoleNavItems } from '@/utils/nav-items';
import { LogOut, Menu, X } from 'lucide-react';
import { SessionUser } from '@/core/auth/session';
import axios from 'axios';
import { toast } from 'react-toastify';

type AppShellProps = {
  children: React.ReactNode;
  user: SessionUser | undefined;
};
export function AppShell({ children, user }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navItems = getRoleNavItems(user?.role || '');
  const isActive = (href: string) => pathname === href;

  async function onLogout() {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.status === 200) {
        router.push('/');
      }
      toast.success('¡Nos vemos!', { toastId: 'logout-success' });
    } catch {
      return toast.error('Error al cerrar sesión', { toastId: 'logout-error' });
    }
  }

  return (
    <>
      <div className="bg-background-light w-screen h-screen text-foreground flex min-h-screen">
        <aside className="bg-background-light hidden w-64 flex-col backdrop-blur-sm md:flex">
          <nav className="flex-1 space-y-1 border-r border-neutral-100 px-3 py-4">
            {navItems.map(({ label, href, Icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(href) ? 'text-primary border border-white/[0.5] bg-white/[0.05] backdrop-blur-2xl' : 'text-foreground hover:bg-slate-200 hover:text-accent-dark'
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-neutral-200 px-3 py-4">
            <div className="space-y-1">
              <button
                className="text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200 hover:text-accent-dark"
                onClick={onLogout}
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <div aria-hidden={!mobileOpen} className={cn('fixed inset-0 z-50 md:hidden', mobileOpen ? 'pointer-events-auto' : 'pointer-events-none')}>
          <div onClick={() => setMobileOpen(false)} className={cn('bg-background absolute inset-0 transition-opacity', mobileOpen ? 'opacity-100' : 'opacity-0')} />
          <aside
            className={cn(
              'bg-background absolute inset-y-0 left-0 w-72 border-r border-neutral-100 shadow-xl backdrop-blur-md transition-transform',
              mobileOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className="flex h-16 items-center justify-between border-b border-neutral-100  px-4">
              <button className="rounded-md p-2 hover:bg-neutral-100" aria-label="Cerrar menú" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1 px-3 py-4">
              {navItems.map(({ label, href, Icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive(href) ? 'text-foreground border border-white/[0.5] bg-white/[0.05] backdrop-blur-2xl' : 'text-foreground hover:bg-background hover:text-slate-300'
                  )}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t border-neutral-200 px-3 py-4">
              <button
                className="text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200 hover:text-accent-dark"
                onClick={onLogout}
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>

        <div className="flex flex-1 flex-col">
          <header className="bg-background-light sticky top-0 z-30 flex h-16 items-center justify-between border-b shadow-sm border-neutral-100 px-4 backdrop-blur-sm md:px-6">
            <div className="flex items-center gap-2">
              <button className="text-foreground rounded-md p-2 hover:bg-neutral-100 md:hidden" aria-label="Abrir menú" onClick={() => setMobileOpen(true)}>
                <Menu size={18} />
              </button>
              <div className="text-foreground hidden text-sm md:block">Bienvenido de nuevo,</div>
              <div className="text-foreground hidden font-medium md:block">{`${user?.name} ${user?.lastName}` || 'Usuario'}</div>
              <div className="text-foreground text-sm font-medium md:hidden">psyeval</div>
            </div>
          </header>

          <main className="relative flex-1 bg-slate-50 p-4 md:p-8">
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
