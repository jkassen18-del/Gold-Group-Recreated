import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { services } from '@/services';
import type { User, Credentials, SignupPayload } from '@/services';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (creds: Credentials) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  /** optimistic balance update used after deposit/withdraw */
  setBalance: (cash: number) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    services.auth
      .restore()
      .then((s) => alive && setUser(s?.user ?? null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const login = useCallback(async (creds: Credentials) => {
    const s = await services.auth.login(creds);
    setUser(s.user);
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    const s = await services.auth.signup(payload);
    setUser(s.user);
  }, []);

  const logout = useCallback(async () => {
    await services.auth.logout();
    setUser(null);
  }, []);

  const setBalance = useCallback((cash: number) => {
    setUser((u) => (u ? { ...u, cash } : u));
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, setBalance }),
    [user, loading, login, signup, logout, setBalance]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
