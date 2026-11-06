import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, Line, G } from 'react-native-svg';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * Lucide-style line icon set, ported from the prototype `ICONS` map plus a few
 * extras used by the account screen. Rendered with react-native-svg so icons
 * scale crisply and inherit colour.
 *
 * Each entry is an array of primitive elements described as tuples so the set
 * stays compact and data-driven.
 */

type El =
  | ['path', string]
  | ['circle', number, number, number]
  | ['rect', number, number, number, number, number?]
  | ['ellipse', number, number, number, number]
  | ['line', number, number, number, number];

const I: Record<string, El[]> = {
  crown: [['path', 'M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z'], ['path', 'M5 21h14']],
  grid: [['rect', 3, 3, 7, 7, 1.5], ['rect', 14, 3, 7, 7, 1.5], ['rect', 3, 14, 7, 7, 1.5], ['rect', 14, 14, 7, 7, 1.5]],
  live: [['circle', 12, 12, 2.2], ['path', 'M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2']],
  gift: [['rect', 3, 8, 18, 4, 1], ['path', 'M12 8v13M19 12v9H5v-9'], ['path', 'M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5']],
  wallet: [['path', 'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5'], ['path', 'M17 14h.01']],
  chat: [['path', 'M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z'], ['path', 'M8 11.5h.01M12 11.5h.01M16 11.5h.01']],
  search: [['circle', 11, 11, 7], ['path', 'M20 20l-4.2-4.2']],
  sparkle: [['path', 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'], ['path', 'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z']],
  flame: [['path', 'M12 22c4.1 0 7-2.9 7-7 0-3.6-2.4-6.2-4-8-.4 2-1.6 3.2-3 3.4.4-3.4-1-6.4-3.4-8.4.2 4.3-4.6 7-4.6 12 0 4.6 3.4 8 8 8z']],
  cherry: [['circle', 7, 17, 3.5], ['circle', 17, 18, 3], ['path', 'M7 13.5C8 8 11 5 16 3M17 15c-.5-4-.5-8-1-12'], ['path', 'M16 3c2 .2 4 1.5 5 3.5-2.3.6-4.2 0-5-3.5z']],
  diamond: [['path', 'M6 3h12l4 6-10 12L2 9z'], ['path', 'M2 9h20M12 21L8 9l2-6M12 21l4-12-2-6']],
  coins: [['ellipse', 9, 7, 6, 3], ['path', 'M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7'], ['path', 'M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.6-2.4-2.9-5.5-3']],
  spade: [['path', 'M12 2.5C9 6.5 4 9.3 4 13.2a4 4 0 0 0 7 2.6L10 21h4l-1-5.2a4 4 0 0 0 7-2.6c0-3.9-5-6.7-8-10.7z']],
  rocket: [['path', 'M5 15.5c-1.5 1.3-2 5.5-2 5.5s4.2-.5 5.5-2c.8-.9.7-2.3-.1-3.1a2.3 2.3 0 0 0-3.4-.4z'], ['path', 'M12 15l-3-3c1.3-3.3 4.6-8.6 13-9-.4 8.4-5.7 11.7-9 13z'], ['path', 'M9 12H5l2-4h4M12 15v4l4-2v-4']],
  heart: [['path', 'M19.5 13.6C21 12 22 10.4 22 8.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .6-4.5 2-1.5-1.4-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 1.9 1 3.5 2.5 5.1L12 21z']],
  chevL: [['path', 'M15 18l-6-6 6-6']],
  chevR: [['path', 'M9 18l6-6-6-6']],
  chevD: [['path', 'M6 9l6 6 6-6']],
  close: [['path', 'M18 6L6 18M6 6l12 12']],
  play: [['path', 'M7 4.5v15l12.5-7.5z']],
  mail: [['rect', 2.5, 4.5, 19, 15, 2], ['path', 'M22 7l-10 6.5L2 7']],
  phone: [['path', 'M21.5 16.6v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 3.8 2 2 0 0 1 3.6 1.6h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.5 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.2z']],
  lock: [['rect', 4, 11, 16, 10, 2], ['path', 'M8 11V7a4 4 0 0 1 8 0v4']],
  plus: [['path', 'M12 5v14M5 12h14']],
  check: [['path', 'M5 12.5l4.5 4.5L19 7']],
  layers: [['path', 'M12 2.5l9.5 5-9.5 5-9.5-5z'], ['path', 'M2.5 12.5l9.5 5 9.5-5M2.5 17l9.5 5 9.5-5']],
  sort: [['path', 'M7 4v16M3.5 16.5L7 20l3.5-3.5M17 20V4M13.5 7.5L17 4l3.5 3.5']],
  zap: [['path', 'M13 2L4 14h7l-1 8 9-12h-7z']],
  trophy: [['path', 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z'], ['path', 'M17 5h3v2a4 4 0 0 1-3.5 4M7 5H4v2a4 4 0 0 0 3.5 4']],
  percent: [['path', 'M19 5L5 19'], ['circle', 6.5, 6.5, 2.5], ['circle', 17.5, 17.5, 2.5]],
  refresh: [['path', 'M21 12a9 9 0 0 1-15.4 6.4L3 16M3 12a9 9 0 0 1 15.4-6.4L21 8'], ['path', 'M21 3v5h-5M3 21v-5h5']],
  target: [['circle', 12, 12, 9], ['circle', 12, 12, 5], ['circle', 12, 12, 1.5]],
  user: [['circle', 12, 8, 4], ['path', 'M4 21a8 8 0 0 1 16 0']],
  jackpot: [['rect', 3, 5, 18, 14, 2], ['path', 'M9 5v14M15 5v14'], ['path', 'M5 12h2M11 12h2M17 12h2']],
  table: [['rect', 3, 6, 12, 16, 2], ['rect', 9, 3, 12, 16, 2]],
  logout: [['path', 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9']],
  // --- extras used by the account screen ---
  history: [['path', 'M3 3v5h5'], ['path', 'M3.05 13A9 9 0 1 0 6 5.3L3 8'], ['path', 'M12 7v5l4 2']],
  shield: [['path', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'], ['path', 'M9 12l2 2 4-4']],
  clock: [['circle', 12, 12, 9], ['path', 'M12 7v5l3 2']],
  device: [['rect', 7, 2, 10, 20, 2], ['path', 'M11 18h2']],
  settings: [['circle', 12, 12, 3], ['path', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-1.1 2.7V9a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z']],
};

export type IconName = keyof typeof I;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  /** solid fill instead of stroke (used for play / filled heart) */
  fill?: boolean;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, color, fill, strokeWidth = 2 }: IconProps) {
  const { colors } = useTheme();
  const c = color ?? colors.text;
  const els = I[name] ?? I.grid;
  const common: {
    fill: string;
    stroke: string;
    strokeWidth?: number;
    strokeLinecap?: 'round';
    strokeLinejoin?: 'round';
  } = fill
    ? { fill: c, stroke: 'none' }
    : { fill: 'none', stroke: c, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G {...common}>
        {els.map((el, i) => {
          switch (el[0]) {
            case 'path':
              return <Path key={i} d={el[1]} />;
            case 'circle':
              return <Circle key={i} cx={el[1]} cy={el[2]} r={el[3]} />;
            case 'rect':
              return <Rect key={i} x={el[1]} y={el[2]} width={el[3]} height={el[4]} rx={el[5] ?? 0} />;
            case 'ellipse':
              return <Ellipse key={i} cx={el[1]} cy={el[2]} rx={el[3]} ry={el[4]} />;
            case 'line':
              return <Line key={i} x1={el[1]} y1={el[2]} x2={el[3]} y2={el[4]} />;
            default:
              return null;
          }
        })}
      </G>
    </Svg>
  );
}
