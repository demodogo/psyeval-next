'use client';
import { AuthProvider } from '@/core/auth/auth-context';
import type { SessionUser } from '@/core/auth/session';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from '@/libs/toast-config';
import '@/styles/toast-styles.css';
import React, { useState } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

type ProviderProps = {
  session: SessionUser | null;
  children: React.ReactNode;
};
export function Providers({ children, session }: ProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AuthProvider initialUser={session}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer newestOnTop={true} {...toastConfig} />
        {children}
      </QueryClientProvider>
    </AuthProvider>
  );
}
