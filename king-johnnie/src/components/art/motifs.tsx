import React from 'react';
import {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  G,
  Path,
  Polygon,
  Rect,
  Circle,
  Ellipse,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import type { GemColor } from '@/data/games';

/**
 * Game-art motifs ported from the prototype `MOTIFS` map. Each motif is a
 * parametric vector illustration drawn on a 300×400 canvas so a single SVG
 * engine produces all 32 game tiles — no bitmap art needed.
 */

export type MotifKey =
  | 'gem' | 'crown' | 'coins' | 'seven' | 'cherry' | 'bolt' | 'pyramid'
  | 'cards' | 'roulette' | 'rocket' | 'bomb' | 'limbo' | 'dice' | 'wheel'
  | 'clover' | 'bell' | 'chest' | 'moon' | 'lotus' | 'sun';

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Shared gradient palette (ported from the prototype art <defs>). */
export function MotifDefs() {
  return (
    <Defs>
      <LinearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#fff3b0" />
        <Stop offset="0.45" stopColor="#ffc21a" />
        <Stop offset="1" stopColor="#c26a00" />
      </LinearGradient>
      <LinearGradient id="red" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#ff6b6b" />
        <Stop offset="1" stopColor="#9b0d0d" />
      </LinearGradient>
      <LinearGradient id="ora" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#ffc06a" />
        <Stop offset="1" stopColor="#e35d00" />
      </LinearGradient>
      <RadialGradient id="orb" cx="40%" cy="35%" r="75%">
        <Stop offset="0" stopColor="#7dd3fc" />
        <Stop offset="1" stopColor="#1e3a8a" />
      </RadialGradient>
      <LinearGradient id="green" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#6ee7a0" />
        <Stop offset="1" stopColor="#0f7a3a" />
      </LinearGradient>
      <RadialGradient id="dark" cx="35%" cy="30%" r="80%">
        <Stop offset="0" stopColor="#555" />
        <Stop offset="1" stopColor="#0a0a0a" />
      </RadialGradient>
      <LinearGradient id="pink" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#ffd1e6" />
        <Stop offset="1" stopColor="#e0408a" />
      </LinearGradient>
      <LinearGradient id="gemb" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#bae6fd" />
        <Stop offset="1" stopColor="#2563eb" />
      </LinearGradient>
      <LinearGradient id="gemr" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#fecdd3" />
        <Stop offset="1" stopColor="#be123c" />
      </LinearGradient>
      <LinearGradient id="gemg" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#bbf7d0" />
        <Stop offset="1" stopColor="#059669" />
      </LinearGradient>
    </Defs>
  );
}

type MotifFn = (gem: GemColor) => React.ReactNode;

export const MOTIFS: Record<MotifKey, MotifFn> = {
  gem: (c) => (
    <G transform="translate(150 160)">
      <Polygon points="-70,-30 -40,-70 40,-70 70,-30 0,70" fill={`url(#gem${c})`} stroke="#fff" strokeOpacity={0.5} strokeWidth={2} />
      <Polygon points="-70,-30 70,-30 0,70" fill="#000" opacity={0.18} />
      <Polygon points="-40,-70 -20,-30 20,-30 40,-70" fill="#fff" opacity={0.35} />
      <Polygon points="-20,-30 20,-30 0,70" fill="#fff" opacity={0.18} />
      <Polygon points="-70,-30 -20,-30 0,70" fill="#000" opacity={0.1} />
      <Circle cx={-38} cy={-52} r={5} fill="#fff" />
      <Path d="M48 -78l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fff" />
    </G>
  ),
  crown: () => (
    <G transform="translate(150 165)">
      <Path d="M-75 35 L-85 -45 L-40 -5 L0 -70 L40 -5 L85 -45 L75 35 Z" fill="url(#gold)" stroke="#7a4100" strokeWidth={4} strokeLinejoin="round" />
      <Rect x={-80} y={35} width={160} height={26} rx={6} fill="url(#gold)" stroke="#7a4100" strokeWidth={4} />
      <Circle cx={0} cy={10} r={14} fill="#e01f1f" stroke="#ffffff66" strokeWidth={3} />
      <Circle cx={-45} cy={18} r={9} fill="#22d3ee" />
      <Circle cx={45} cy={18} r={9} fill="#22c55e" />
      <Circle cx={-85} cy={-48} r={8} fill="url(#gold)" />
      <Circle cx={0} cy={-73} r={9} fill="url(#gold)" />
      <Circle cx={85} cy={-48} r={8} fill="url(#gold)" />
    </G>
  ),
  coins: () => (
    <G transform="translate(150 175)">
      {range(4).map((i) => (
        <Ellipse key={`a${i}`} cx={-38} cy={40 - i * 16} rx={46} ry={16} fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      ))}
      {range(3).map((i) => (
        <Ellipse key={`b${i}`} cx={40} cy={48 - i * 16} rx={46} ry={16} fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      ))}
      <Circle cx={10} cy={-45} r={48} fill="url(#gold)" stroke="#7a4100" strokeWidth={5} />
      <Circle cx={10} cy={-45} r={36} fill="none" stroke="#7a4100" strokeOpacity={0.5} strokeWidth={3} />
      <Path d="M10 -70l7 15 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z" fill="#7a4100" opacity={0.7} />
    </G>
  ),
  seven: () => (
    <G transform="translate(150 175)">
      <SvgText x={0} y={55} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="900" fontSize={190} fill="url(#red)" stroke="url(#gold)" strokeWidth={9}>7</SvgText>
      <Path d="M70 -70l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="#fff" />
    </G>
  ),
  cherry: () => (
    <G transform="translate(150 170)">
      <Path d="M-30 20 C-25 -30 0 -60 30 -75 M35 25 C30 -20 30 -50 30 -75" stroke="#3f7a1a" strokeWidth={8} fill="none" strokeLinecap="round" />
      <Path d="M30 -75 C55 -80 75 -65 80 -45 C55 -40 38 -50 30 -75z" fill="#4ade80" stroke="#1f5a10" strokeWidth={3} />
      <Circle cx={-35} cy={40} r={40} fill="url(#red)" stroke="#5a0606" strokeWidth={4} />
      <Circle cx={40} cy={45} r={36} fill="url(#red)" stroke="#5a0606" strokeWidth={4} />
      <Circle cx={-50} cy={25} r={10} fill="#fff" opacity={0.6} />
      <Circle cx={27} cy={32} r={8} fill="#fff" opacity={0.6} />
    </G>
  ),
  bolt: () => (
    <G transform="translate(150 160)">
      <Circle r={78} fill="url(#orb)" stroke="url(#gold)" strokeWidth={8} />
      <Circle r={62} fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={2} />
      <Path d="M12 -70 L-38 8 L-2 8 L-14 72 L40 -12 L4 -12 Z" fill="url(#gold)" stroke="#7a4100" strokeWidth={4} strokeLinejoin="round" />
    </G>
  ),
  pyramid: () => (
    <G transform="translate(150 170)">
      <Circle cx={0} cy={-35} r={55} fill="url(#gold)" opacity={0.9} />
      <Polygon points="0,-60 95,60 -95,60" fill="#d4a14a" stroke="#6b4310" strokeWidth={4} />
      <Polygon points="0,-60 95,60 20,60" fill="#8a5a1a" />
      {range(4).map((i) => (
        <Line key={i} x1={-75 + i * 12} y1={35 - i * 25} x2={75 - i * 12} y2={35 - i * 25} stroke="#6b4310" strokeWidth={2} opacity={0.5} />
      ))}
      <Rect x={-130} y={60} width={260} height={14} fill="#6b4310" opacity={0.6} />
    </G>
  ),
  cards: () => (
    <G transform="translate(150 165)">
      <G transform="rotate(-16)">
        <Rect x={-58} y={-80} width={100} height={140} rx={10} fill="#fff" stroke="#222" strokeWidth={2} />
        <Path d="M-8 -30c-15 20-30 28-30 42a14 14 0 0 0 24 9l-4 18h20l-4-18a14 14 0 0 0 24-9c0-14-15-22-30-42z" fill="#111" />
      </G>
      <G transform="rotate(14)">
        <Rect x={-38} y={-75} width={100} height={140} rx={10} fill="#fff" stroke="#222" strokeWidth={2} />
        <Path d="M12 30c-25-18-38-30-38-45a18 18 0 0 1 38-6 18 18 0 0 1 38 6c0 15-13 27-38 45z" fill="url(#ora)" />
      </G>
      <Circle cx={70} cy={60} r={26} fill="url(#ora)" stroke="#fff" strokeWidth={5} strokeDasharray="8 6" />
      <Circle cx={-80} cy={55} r={22} fill="#111" stroke="#fff" strokeWidth={5} strokeDasharray="7 5" />
    </G>
  ),
  roulette: () => (
    <G transform="translate(150 165)">
      <Circle r={85} fill="#3a2410" stroke="url(#gold)" strokeWidth={8} />
      <Circle r={66} fill="none" stroke="#b91c1c" strokeWidth={26} strokeDasharray="10.9 10.9" />
      <Circle r={66} fill="none" stroke="#111" strokeWidth={26} strokeDasharray="10.9 10.9" strokeDashoffset="10.9" />
      <Circle r={50} fill="url(#ora)" />
      <Circle r={22} fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <Line key={a} x1={0} y1={0} x2={0} y2={-46} stroke="#7a4100" strokeWidth={5} transform={`rotate(${a})`} />
      ))}
      <Circle cx={35} cy={-52} r={8} fill="#fff" />
    </G>
  ),
  rocket: () => (
    <G transform="translate(150 165) rotate(35)">
      <Path d="M0 -95 C40 -55 40 10 25 50 L-25 50 C-40 10 -40 -55 0 -95z" fill="#f5f5f5" stroke="#555" strokeWidth={3} />
      <Circle cy={-30} r={18} fill="url(#ora)" stroke="#555" strokeWidth={4} />
      <Path d="M-25 20 L-55 60 L-25 50z M25 20 L55 60 L25 50z" fill="url(#ora)" />
      <Path d="M-18 52 Q0 120 18 52z" fill="url(#gold)" />
      <Path d="M-10 52 Q0 95 10 52z" fill="#fff" />
    </G>
  ),
  bomb: () => (
    <G transform="translate(150 175)">
      <Circle r={68} fill="url(#dark)" stroke="#000" strokeWidth={3} />
      <Circle cx={-25} cy={-25} r={16} fill="#fff" opacity={0.25} />
      <Rect x={-16} y={-84} width={32} height={20} rx={4} fill="#555" />
      <Path d="M0 -84 Q20 -120 55 -105" stroke="#8a6a40" strokeWidth={6} fill="none" />
      <Path d="M58 -118l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="url(#gold)" />
    </G>
  ),
  limbo: () => (
    <G transform="translate(150 165)">
      <SvgText y={-40} fontSize={46} fontFamily="Montserrat, sans-serif" fontWeight="900" textAnchor="middle" fill="#fff" opacity={0.5} transform="rotate(-6)">33.70x</SvgText>
      <SvgText y={20} fontSize={58} fontFamily="Montserrat, sans-serif" fontWeight="900" textAnchor="middle" fill="url(#ora)" transform="rotate(-6)">58.00x</SvgText>
      <SvgText y={78} fontSize={46} fontFamily="Montserrat, sans-serif" fontWeight="900" textAnchor="middle" fill="#fff" opacity={0.7} transform="rotate(-6)">40.88x</SvgText>
    </G>
  ),
  dice: () => (
    <G transform="translate(150 165)">
      <G transform="rotate(-14) translate(-45 0)">
        <Rect x={-45} y={-45} width={90} height={90} rx={16} fill="#fff" stroke="#bbb" strokeWidth={3} />
        {[[-22, -22], [22, 22], [0, 0]].map(([x, y], i) => (
          <Circle key={i} cx={x} cy={y} r={9} fill="#b91c1c" />
        ))}
      </G>
      <G transform="rotate(16) translate(52 10)">
        <Rect x={-40} y={-40} width={80} height={80} rx={14} fill="url(#ora)" stroke="#7a4100" strokeWidth={3} />
        {[[-18, -18], [18, -18], [-18, 18], [18, 18]].map(([x, y], i) => (
          <Circle key={i} cx={x} cy={y} r={8} fill="#fff" />
        ))}
      </G>
    </G>
  ),
  wheel: () => (
    <G transform="translate(150 160)">
      <Circle r={85} fill="#111" stroke="url(#gold)" strokeWidth={8} />
      {['#e01f1f', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#e01f1f', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'].map((c, i) => (
        <Path key={i} d="M0 0 L0 -78 A78 78 0 0 1 39 -67.5 Z" fill={c} transform={`rotate(${i * 30})`} />
      ))}
      <Circle r={20} fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      {range(12).map((i) => (
        <Circle key={i} cx={0} cy={-82} r={3.5} fill="#fff" transform={`rotate(${i * 30 + 15})`} />
      ))}
      <Path d="M-12 -100 L12 -100 L0 -78z" fill="#fff" />
    </G>
  ),
  clover: () => (
    <G transform="translate(150 165)">
      {[0, 90, 180, 270].map((a) => (
        <Path key={a} d="M0 0 C-40 -20 -40 -70 0 -60 C40 -70 40 -20 0 0z" fill="url(#green)" stroke="#0b4020" strokeWidth={3} transform={`rotate(${a})`} />
      ))}
      <Path d="M0 0 Q20 50 5 95" stroke="#0b4020" strokeWidth={7} fill="none" />
      <Circle r={9} fill="url(#gold)" />
    </G>
  ),
  bell: () => (
    <G transform="translate(150 165)">
      <Path d="M0 -80 C-50 -80 -55 -30 -55 10 L-72 50 L72 50 L55 10 C55 -30 50 -80 0 -80z" fill="url(#gold)" stroke="#7a4100" strokeWidth={4} />
      <Rect x={-80} y={48} width={160} height={12} rx={6} fill="#a86400" />
      <Circle cy={70} r={14} fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      <Path d="M-30 -45 Q-38 0 -36 30" stroke="#fff" strokeOpacity={0.5} strokeWidth={7} fill="none" />
    </G>
  ),
  chest: () => (
    <G transform="translate(150 175)">
      <Path d="M-85 -20 Q-85 -80 0 -80 Q85 -80 85 -20z" fill="#7c3f12" stroke="#3a1a05" strokeWidth={4} />
      <Rect x={-85} y={-20} width={170} height={90} rx={6} fill="#8b4a17" stroke="#3a1a05" strokeWidth={4} />
      <Rect x={-85} y={-28} width={170} height={16} fill="url(#gold)" />
      <Rect x={-14} y={-30} width={28} height={36} rx={4} fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      {[-55, 55].map((x) => (
        <Rect key={x} x={x - 8} y={-80} width={16} height={150} fill="url(#gold)" opacity={0.9} />
      ))}
      {[[-40, -95], [0, -110], [40, -98], [-15, -125], [25, -128]].map(([x, y], i) => (
        <Circle key={i} cx={x} cy={y} r={14} fill="url(#gold)" stroke="#7a4100" strokeWidth={2} />
      ))}
    </G>
  ),
  moon: () => (
    <G transform="translate(150 160)">
      <Path d="M30 -80 A80 80 0 1 0 60 55 A62 62 0 1 1 30 -80z" fill="url(#gold)" stroke="#7a4100" strokeWidth={3} />
      {[[60, -50, 10], [85, 0, 6], [40, -5, 5], [75, 40, 8]].map(([x, y, r], i) => (
        <Path key={i} d={`M${x} ${y - r * 2}l${r * 0.5} ${r * 1.5} ${r * 1.5} ${r * 0.5}-${r * 1.5} ${r * 0.5}-${r * 0.5} ${r * 1.5}-${r * 0.5}-${r * 1.5}-${r * 1.5}-${r * 0.5} ${r * 1.5}-${r * 0.5}z`} fill="#fff" />
      ))}
    </G>
  ),
  lotus: () => (
    <G transform="translate(150 175)">
      {[-60, -30, 0, 30, 60].map((a) => (
        <Ellipse key={a} cx={0} cy={-50} rx={24} ry={58} fill="url(#pink)" stroke="#7a1040" strokeWidth={3} transform={`rotate(${a})`} />
      ))}
      <Ellipse cy={10} rx={80} ry={18} fill="url(#green)" />
      <Circle cy={-15} r={16} fill="url(#gold)" />
    </G>
  ),
  sun: () => (
    <G transform="translate(150 160)">
      {range(12).map((i) => (
        <Path key={i} d="M0 -95 L12 -62 L-12 -62z" fill="url(#gold)" transform={`rotate(${i * 30})`} />
      ))}
      <Circle r={58} fill="url(#gold)" stroke="#7a4100" strokeWidth={4} />
      <Circle r={44} fill="none" stroke="#7a4100" strokeOpacity={0.4} strokeWidth={3} />
    </G>
  ),
};
