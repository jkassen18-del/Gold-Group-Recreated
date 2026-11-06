import type { MotifKey } from '@/components/art/motifs';

export type GameCategory =
  | 'pokies'
  | 'originals'
  | 'jackpot'
  | 'live'
  | 'table'
  | 'instant';

export type GemColor = 'b' | 'r' | 'g';

export interface Game {
  id: string;
  title: string;
  cat: GameCategory;
  prov: string;
  motif: MotifKey;
  /** tile background gradient (top → bottom) */
  from: string;
  to: string;
  pop: number;
  tags?: Array<'hot' | 'new' | 'live'>;
  rtp?: number;
  vol?: 'low' | 'medium' | 'high';
  sub?: string;
  gem?: GemColor;
  jackpot?: number;
  players?: number;
}

let order = 0;
const G = (
  id: string,
  title: string,
  cat: GameCategory,
  prov: string,
  motif: MotifKey,
  from: string,
  to: string,
  x: Partial<Game> = {}
): Game => ({ id, title, cat, prov, motif, from, to, pop: order++, ...x });

export const GAMES: Game[] = [
  G('g1', 'Crown of Fortune', 'pokies', 'booongo', 'crown', '#7a2e0e', '#1a0602', { tags: ['hot'], rtp: 96.4, vol: 'high', sub: 'HOLD & WIN' }),
  G('g2', 'Diamond Rush', 'pokies', 'playson', 'gem', '#4c1d95', '#0f0526', { tags: ['new'], rtp: 96.1, vol: 'medium', sub: 'HOLD & WIN', gem: 'b' }),
  G('g3', 'Volt Coins', 'pokies', 'playson', 'bolt', '#1e3a8a', '#020617', { tags: ['hot'], rtp: 95.8, vol: 'high', sub: '3x3' }),
  G('g4', 'Desert Gold', 'pokies', 'booongo', 'pyramid', '#9a3412', '#1c0a02', { rtp: 96.7, vol: 'low' }),
  G('g5', 'Lucky Sevens', 'pokies', 'bgaming', 'seven', '#7f1d1d', '#160303', { rtp: 96.2, vol: 'medium' }),
  G('g6', 'Cherry Blaze', 'pokies', 'penguin', 'cherry', '#831843', '#14030b', { tags: ['hot'], rtp: 95.5, vol: 'high' }),
  G('g7', 'Ruby Riches', 'pokies', 'booongo', 'gem', '#881337', '#16020a', { tags: ['new'], rtp: 96.0, vol: 'medium', gem: 'r' }),
  G('g8', 'Golden Bells', 'pokies', 'bgaming', 'bell', '#78350f', '#140801', { rtp: 96.3, vol: 'low' }),
  G('g9', 'Treasure Chest', 'pokies', 'penguin', 'chest', '#065f46', '#021410', { tags: ['new'], rtp: 96.0, vol: 'medium', sub: 'HOLD & WIN' }),
  G('g10', 'Moonlight Stars', 'pokies', 'bgaming', 'moon', '#312e81', '#05041a', { tags: ['new'], rtp: 96.2, vol: 'high' }),
  G('g11', 'Lotus Bloom', 'pokies', 'playson', 'lotus', '#9d174d', '#1a0410', { rtp: 96.5, vol: 'medium' }),
  G('g12', 'Lucky Clover', 'pokies', 'penguin', 'clover', '#14532d', '#03140a', { rtp: 95.9, vol: 'high' }),
  G('g13', 'Emerald Mine', 'pokies', 'booongo', 'gem', '#065f46', '#02140e', { rtp: 96.1, vol: 'medium', gem: 'g' }),
  G('g14', 'Sun Temple', 'pokies', 'playson', 'sun', '#9a3412', '#1a0802', { tags: ['hot'], rtp: 96.0, vol: 'high' }),

  G('o1', 'Crash', 'originals', 'kj', 'rocket', '#3a2410', '#0e0a06', { rtp: 99 }),
  G('o2', 'Mines', 'originals', 'kj', 'bomb', '#3a2410', '#0e0a06', { rtp: 99 }),
  G('o3', 'Limbo', 'originals', 'kj', 'limbo', '#3a2410', '#0e0a06', { tags: ['new'], rtp: 99 }),
  G('o4', 'Diamonds', 'originals', 'kj', 'gem', '#3a2410', '#0e0a06', { rtp: 98.5, gem: 'b' }),
  G('o5', 'Roulette', 'originals', 'kj', 'roulette', '#3a2410', '#0e0a06', { rtp: 97.3 }),
  G('o6', 'Blackjack', 'originals', 'kj', 'cards', '#3a2410', '#0e0a06', { rtp: 99.5 }),
  G('o7', 'Dice', 'originals', 'kj', 'dice', '#3a2410', '#0e0a06', { rtp: 99 }),
  G('o8', 'Video Poker', 'originals', 'kj', 'cards', '#3a2410', '#0e0a06', { rtp: 99.1 }),

  G('j1', 'Mega Crown Jackpot', 'jackpot', 'booongo', 'crown', '#713f12', '#140a01', { jackpot: 1284903 }),
  G('j2', 'Coin Vault', 'jackpot', 'playson', 'coins', '#78350f', '#140801', { jackpot: 412660 }),
  G('j3', 'Royal Gems', 'jackpot', 'bgaming', 'gem', '#4c1d95', '#0f0526', { jackpot: 88120, gem: 'r' }),

  G('l1', 'Roulette Lounge', 'live', 'live', 'roulette', '#7f1d1d', '#160303', { players: 2841 }),
  G('l2', 'Blackjack Salon', 'live', 'live', 'cards', '#064e3b', '#02140e', { players: 412 }),
  G('l3', 'Baccarat Room', 'live', 'live', 'cards', '#4c1d95', '#0f0526', { players: 978 }),
  G('l4', 'Wheel Spectacular', 'live', 'live', 'wheel', '#78350f', '#140801', { players: 5120 }),

  G('t1', 'European Roulette', 'table', 'bgaming', 'roulette', '#14532d', '#03140a', { rtp: 97.3 }),
  G('t2', 'Classic Blackjack', 'table', 'penguin', 'cards', '#0c4a6e', '#020d16', { rtp: 99.5 }),

  G('i1', 'Pride Plinko', 'instant', 'bgaming', 'dice', '#0c4a6e', '#020d16', { tags: ['new'], rtp: 97 }),
];

export const gameById = (id: string) => GAMES.find((g) => g.id === id);
