import React, { useMemo } from 'react';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Rect,
  Text as SvgText,
  G,
} from 'react-native-svg';
import { MOTIFS, MotifDefs } from './motifs';
import type { Game } from '@/data/games';

/**
 * Renders a game's cover art as a single SVG (300×400), composed of:
 *  - a themed background gradient (game.from → game.to)
 *  - the parametric motif illustration
 *  - the title, wrapped and drawn in a bold gold-outlined display face
 *
 * This mirrors the prototype `art(game)` generator so every tile is unique
 * and resolution-independent.
 */
function wrapTitle(title: string): string[] {
  const words = title.toUpperCase().split(' ');
  const lines: string[] = [];
  for (const w of words) {
    const last = lines[lines.length - 1];
    if (last && (last + ' ' + w).length <= 11) lines[lines.length - 1] = last + ' ' + w;
    else lines.push(w);
  }
  return lines;
}

export interface GameArtProps {
  game: Game;
  /** show the title text overlay (true for tiles, false for ambient art) */
  showTitle?: boolean;
}

export function GameArt({ game, showTitle = true }: GameArtProps) {
  const lines = useMemo(() => wrapTitle(game.title), [game.title]);
  const fs = lines.some((l) => l.length > 9) ? 34 : 40;
  const ty = 330 - (lines.length - 1) * (fs * 0.5);
  const bgId = `bg_${game.id}`;
  const motif = MOTIFS[game.motif] ?? MOTIFS.gem;

  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <RadialGradient id={bgId} cx="50%" cy="34%" r="80%">
          <Stop offset="0" stopColor={game.from} />
          <Stop offset="1" stopColor={game.to} />
        </RadialGradient>
        <LinearGradient id={`sh_${game.id}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#000" stopOpacity={0} />
          <Stop offset="1" stopColor="#000" stopOpacity={0.55} />
        </LinearGradient>
      </Defs>
      <MotifDefs />

      <Rect x={0} y={0} width={300} height={400} fill={`url(#${bgId})`} />
      <G>{motif(game.gem ?? 'b')}</G>
      <Rect x={0} y={200} width={300} height={200} fill={`url(#sh_${game.id})`} />

      {showTitle &&
        lines.map((line, i) => (
          <SvgText
            key={i}
            x={150}
            y={ty + i * fs}
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            fontSize={fs}
            fill="#ffe8a3"
            stroke="#3a1d02"
            strokeWidth={3}
          >
            {line}
          </SvgText>
        ))}
      {showTitle && game.sub ? (
        <SvgText x={150} y={ty + lines.length * fs + 6} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={15} fill="#ffd27a" letterSpacing={1}>
          {game.sub}
        </SvgText>
      ) : null}
    </Svg>
  );
}
