import { delay } from './http';
import { config } from './config';
import type {
  AuthService,
  WalletService,
  GamesService,
  ContentService,
  Session,
  User,
  Credentials,
  SignupPayload,
  DepositRequest,
  WithdrawRequest,
  TxResult,
  GameLaunch,
} from './types';
import { GAMES, type Game } from '@/data/games';
import { PROMOS } from '@/data/promos';
import { INFO_PAGES } from '@/data/infoPages';
import { DEPOSIT_METHODS, WITHDRAW_METHODS } from '@/data/methods';
import { ACCOUNT_MOCK, type Transaction } from '@/data/account';

/**
 * Offline adapters backed by the bundled demo dataset. These let the whole app
 * run with zero backend — ideal for design review, Storybook-style demos and
 * tests. Every method mimics realistic latency and shapes.
 */

const TAKEN = ['admin', 'kingjohnnie', 'jamal', 'test', 'lion'];
let current: User | null = null;

function makeUser(name: string): User {
  return {
    id: 'u_' + Math.random().toString(36).slice(2, 9),
    name,
    email: `${name.toLowerCase()}@example.com`,
    phone: '+61 412 345 678',
    cash: 1250.4,
    bonus: 150,
    currency: config.defaultCurrency,
    kyc: ACCOUNT_MOCK.kyc,
  };
}

export const mockAuth: AuthService = {
  async login({ username }: Credentials) {
    await delay(500);
    current = makeUser(username || 'Player');
    return { user: current, token: 'mock-token' } satisfies Session;
  },
  async signup(p: SignupPayload) {
    await delay(650);
    current = makeUser(p.username);
    current.cash = 0; // fresh account
    current.bonus = 0;
    return { user: current, token: 'mock-token' } satisfies Session;
  },
  async logout() {
    await delay(150);
    current = null;
  },
  async restore() {
    return current ? { user: current, token: 'mock-token' } : null;
  },
  async isUsernameTaken(name: string) {
    await delay(250);
    return TAKEN.includes(name.toLowerCase());
  },
};

export const mockWallet: WalletService = {
  async getBalance() {
    await delay(200);
    return {
      cash: current?.cash ?? 0,
      bonus: current?.bonus ?? 0,
      currency: config.defaultCurrency,
    };
  },
  async depositMethods() {
    await delay(150);
    return DEPOSIT_METHODS;
  },
  async withdrawMethods() {
    await delay(150);
    return WITHDRAW_METHODS;
  },
  async deposit({ amount }: DepositRequest) {
    await delay(900);
    if (current) current.cash += amount;
    return {
      ok: true,
      reference: 'DEP-' + Date.now().toString().slice(-8),
      newBalance: current?.cash,
    } satisfies TxResult;
  },
  async withdraw({ amount }: WithdrawRequest) {
    await delay(900);
    if (current && current.cash < amount) {
      return { ok: false, message: 'Insufficient balance' };
    }
    if (current) current.cash -= amount;
    return {
      ok: true,
      reference: 'WD-' + Date.now().toString().slice(-8),
      newBalance: current?.cash,
    } satisfies TxResult;
  },
  async transactions(filter?: string) {
    await delay(200);
    const txs = ACCOUNT_MOCK.txs as Transaction[];
    return !filter || filter === 'All' ? txs : txs.filter((t) => t.type === filter);
  },
  async bonuses() {
    await delay(150);
    return ACCOUNT_MOCK.bonuses;
  },
};

const sortByPop = (a: Game, b: Game) => a.pop - b.pop;

export const mockGames: GamesService = {
  async list() {
    await delay(120);
    return [...GAMES].sort(sortByPop);
  },
  async byCategory(cat: string) {
    await delay(120);
    return GAMES.filter((g) => g.cat === cat).sort(sortByPop);
  },
  async search(query: string) {
    await delay(120);
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return GAMES.filter(
      (g) => g.title.toLowerCase().includes(q) || g.prov.toLowerCase().includes(q)
    );
  },
  async launch(_gameId: string, mode) {
    await delay(300);
    return { url: '', mode } satisfies GameLaunch; // empty → UI shows demo canvas
  },
};

export const mockContent: ContentService = {
  async promotions() {
    await delay(120);
    return PROMOS;
  },
  async infoPage(slug: string) {
    await delay(120);
    return INFO_PAGES[slug] ?? null;
  },
};
