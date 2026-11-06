import type { IconName } from '@/components/Icon';

/** Lobby category tabs — [key, icon, label]. */
export const TABS: Array<[string, IconName, string]> = [
  ['all', 'grid', 'Lobby'],
  ['top', 'crown', 'Top 50'],
  ['new', 'sparkle', 'New'],
  ['hot', 'flame', 'Hot'],
  ['originals', 'diamond', 'Originals'],
  ['pokies', 'cherry', 'Video slots'],
  ['jackpot', 'jackpot', 'Jackpots'],
  ['live', 'live', 'Live dealer'],
  ['table', 'table', 'Table games'],
];

export const SORTS: Array<[string, string]> = [
  ['pop', 'Most popular'],
  ['new', 'Newest'],
  ['az', 'A–Z'],
  ['za', 'Z–A'],
  ['rtp', 'Highest RTP'],
];

export const COUNTRIES: Array<[string, string, string]> = [
  ['AU', '+61', 'Australia'],
  ['NZ', '+64', 'New Zealand'],
  ['CA', '+1', 'Canada'],
  ['IE', '+353', 'Ireland'],
  ['GB', '+44', 'United Kingdom'],
  ['ZA', '+27', 'South Africa'],
  ['IN', '+91', 'India'],
  ['JP', '+81', 'Japan'],
  ['DE', '+49', 'Germany'],
  ['NO', '+47', 'Norway'],
  ['FI', '+358', 'Finland'],
  ['BR', '+55', 'Brazil'],
];

export const PAGE_NAMES: Record<string, string> = {
  lobby: 'Casino',
  live: 'Live casino',
  promos: 'Promotions',
  wallet: 'Wallet',
  contact: 'Contact',
  account: 'My account',
  info: 'Info page',
};
