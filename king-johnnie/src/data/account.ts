import type { IconName } from '@/components/Icon';

export interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Bonus';
  method: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface Bonus {
  name: string;
  detail: string;
  wager: number;
  expires: string;
  icon: IconName;
  spins?: string;
}

export interface SessionInfo {
  device: string;
  where: string;
  when: string;
  current?: boolean;
}

/** Account sub-navigation — [key, icon, label]. */
export const ACCOUNT_TABS: Array<[string, IconName, string]> = [
  ['profile', 'user', 'Profile'],
  ['security', 'lock', 'Password & security'],
  ['transactions', 'history', 'Transactions'],
  ['bonuses', 'gift', 'Active bonuses'],
  ['verification', 'shield', 'Verification'],
  ['limits', 'clock', 'Responsible gaming'],
  ['sessions', 'device', 'Active sessions'],
  ['prefs', 'settings', 'Preferences'],
];

export const ACCOUNT_MOCK = {
  txs: [
    { id: 'TX-10482', type: 'Deposit', method: 'PayID', amount: 100, status: 'Completed', date: '2026-11-05 19:40' },
    { id: 'TX-10471', type: 'Bonus', method: 'Weekend Reload', amount: 50, status: 'Completed', date: '2026-11-04 09:12' },
    { id: 'TX-10455', type: 'Withdrawal', method: 'Bank transfer', amount: -240, status: 'Completed', date: '2026-10-30 08:05' },
    { id: 'TX-10433', type: 'Deposit', method: 'Visa •••• 4242', amount: 250, status: 'Completed', date: '2026-10-28 21:18' },
    { id: 'TX-10419', type: 'Deposit', method: 'Crypto (USDT)', amount: 500, status: 'Completed', date: '2026-10-21 13:02' },
  ] as Transaction[],
  bonuses: [
    { name: 'Welcome Package · 2nd deposit', detail: '100% up to $1000 + 20 Kash Spins', wager: 0.42, expires: '9 days left', icon: 'gift' },
    { name: 'Kash Spins', detail: '20 spins on Crown of Fortune', wager: 0, expires: '2 days left', icon: 'sparkle', spins: '14 / 20 left' },
  ] as Bonus[],
  sessions: [
    { device: 'Chrome on Windows', where: 'Sydney, AU', when: 'Active now', current: true },
    { device: 'Safari on iPhone', where: 'Sydney, AU', when: '2 hours ago' },
    { device: 'Chrome on Android', where: 'Melbourne, AU', when: '6 days ago' },
  ] as SessionInfo[],
  kyc: 'pending' as 'pending' | 'verified' | 'rejected',
  limits: { daily: 500, weekly: 2000, session: 120, reality: 30 },
  prefs: { email: true, sms: false, push: true, twofa: true },
};

export const TX_FILTERS = ['All', 'Deposit', 'Withdrawal', 'Bonus'] as const;
