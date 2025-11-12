'use client';
import { createContext, useContext, useState } from 'react';
import type { SessionUser } from '@/core/auth/session';
import axios from 'axios';

type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = { children: React.ReactNode; initialUser: SessionUser | null };

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/auth/me');
      if (res.status !== 200) {
        new Error('Error al obtener el usuario');
      }
      const data = res.data;
      setUser(data.user ?? null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return <AuthContext.Provider value={{ user, loading, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return ctx;
}
