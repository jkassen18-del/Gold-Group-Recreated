import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

interface FavoritesContextValue {
  favs: Set<string>;
  isFav: (id: string) => boolean;
  toggle: (id: string) => boolean; // returns new state
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favs, setFavs] = useState<Set<string>>(new Set());

  const isFav = useCallback((id: string) => favs.has(id), [favs]);

  const toggle = useCallback((id: string) => {
    let now = false;
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        now = false;
      } else {
        next.add(id);
        now = true;
      }
      return next;
    });
    return now;
  }, []);

  const value = useMemo(() => ({ favs, isFav, toggle }), [favs, isFav, toggle]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
