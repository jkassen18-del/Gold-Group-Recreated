import type { IconName } from '@/components/Icon';

export interface Promo {
  id: string;
  tag: string;
  title: string;
  hl: string;
  sub: string;
  /** feature image (bundled) for the two headline promos */
  image?: 'welcome';
  /** icon + gradient for the generic promos */
  icon?: IconName;
  from?: string;
  to?: string;
}

export const PROMOS: Promo[] = [
  { id: 'welcome', tag: 'Welcome offer', title: 'Welcome offer', hl: '$6000 Free + 200 Kash Spins', sub: 'Join the pride', image: 'welcome' },
  { id: 'vip', tag: 'Loyalty', title: 'Johnnie Jewels', hl: 'Loyalty programme', sub: 'Earn as you play, unlock exclusive rewards', icon: 'diamond', from: '#2b1703', to: '#140a01' },
  { id: 'p1', tag: 'Fri–Sun', title: 'Weekend Reload', hl: '50% up to $500 + 50 Kash Spins', sub: 'Every weekend', icon: 'refresh', from: '#4c1d95', to: '#1a0b3a' },
  { id: 'p2', tag: 'Live now', title: 'Pride Tournament', hl: '$25,000 prize pool', sub: 'On featured pokies', icon: 'trophy', from: '#9a3412', to: '#2a1203' },
  { id: 'p3', tag: 'Weekly', title: 'Cashback Mondays', hl: '10% back on net losses', sub: 'No wagering', icon: 'percent', from: '#065f46', to: '#04221a' },
  { id: 'p4', tag: 'Daily', title: 'Live Casino Drops', hl: 'Random cash drops', sub: 'At live tables', icon: 'live', from: '#9f1239', to: '#2a0610' },
];
