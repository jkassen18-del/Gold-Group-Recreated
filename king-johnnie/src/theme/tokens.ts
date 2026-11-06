/**
 * Design tokens — ported 1:1 from the King Johnnie prototype `:root` variables.
 * These are the single source of truth for colour, radius and motion.
 */

export const palette = {
  // Brand (orange)
  primary: '#ff8a00',
  primaryDeep: '#e36400',
  primaryLight: '#ffb347',
  primarySoft: 'rgba(255,138,0,0.12)',
  primaryGlow: 'rgba(255,138,0,0.38)',

  // Surfaces
  bg: '#121212',
  bgDeep: '#050505',
  panel: '#1a1a1a',
  panel2: '#222222',
  field: '#161616',

  // Borders
  border: '#2a2a2a',
  borderStrong: '#3a3a3a',

  // Text
  text: '#ffffff',
  muted: '#b8b8b8',
  faint: '#7d7d7d',

  // Status / accents
  hot: '#e01f1f',
  live: '#ff3b5c',
  success: '#3fd18b',
  danger: '#ff5d5d',
  warning: '#ffb347',
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const motion = {
  /** base animation duration (ms) — matches prototype --dur */
  dur: 320,
  fast: 180,
  slow: 480,
  spring: { damping: 16, stiffness: 180, mass: 0.9 },
  bouncy: { damping: 11, stiffness: 160, mass: 0.8 },
} as const;

export const typography = {
  family: 'System', // swap for a loaded font (Jost / Montserrat / Inter) via expo-font
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 21,
    title: 26,
    hero: 32,
  },
} as const;

/** Generic drop shadow preset used across cards. */
export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  glow: {
    shadowColor: palette.primary,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
} as const;

/** Colour keys with plain string values (brand colours are swappable at runtime). */
export type Palette = { [K in keyof typeof palette]: string };
