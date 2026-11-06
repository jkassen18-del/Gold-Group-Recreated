import React, { createContext, useContext, useMemo, useState } from 'react';
import { palette, radius, spacing, motion, typography, shadow, type Palette } from './tokens';

/**
 * Theme is intentionally simple: it exposes the tokens plus a runtime-swappable
 * brand colour so the same codebase can re-skin for other Gold Group casinos.
 */
export interface Theme {
  colors: Palette;
  radius: typeof radius;
  spacing: typeof spacing;
  motion: typeof motion;
  typography: typeof typography;
  shadow: typeof shadow;
}

interface ThemeContextValue extends Theme {
  setBrandColor: (hex: string) => void;
}

const base: Theme = { colors: palette, radius, spacing, motion, typography, shadow };

const ThemeContext = createContext<ThemeContextValue>({
  ...base,
  setBrandColor: () => {},
});

/** Lighten/darken a hex colour (ported from the prototype `shade()` helper). */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (c: number) =>
    Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  return (
    '#' +
    [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      .map((c) => clamp(c).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function rgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<string>(palette.primary);

  const value = useMemo<ThemeContextValue>(() => {
    const colors: Palette = {
      ...palette,
      primary: brand,
      primaryDeep: shade(brand, -0.18),
      primaryLight: shade(brand, 0.3),
      primarySoft: rgba(brand, 0.12),
      primaryGlow: rgba(brand, 0.38),
    };
    return { ...base, colors, setBrandColor: setBrand };
  }, [brand]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
