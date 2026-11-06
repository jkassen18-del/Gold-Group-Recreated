import { http, setAuthToken } from './http';
import { config } from './config';
import type {
  AuthService,
  WalletService,
  GamesService,
  ContentService,
  Session,
  Credentials,
  SignupPayload,
  DepositRequest,
  WithdrawRequest,
  TxResult,
  GameLaunch,
} from './types';
import type { Game } from '@/data/games';
import type { Promo } from '@/data/promos';
import type { InfoPage } from '@/data/infoPages';
import type { PayMethod } from '@/data/methods';
import type { Transaction, Bonus } from '@/data/account';

/**
 * REST adapters. These map the UI's service contract onto HTTP endpoints.
 * Adjust the paths to match your platform/aggregator (SoftSwiss, EveryMatrix,
 * Pragmatic, a bespoke API, ...). Response shaping stays here so screens never
 * change when the backend does.
 */

export const liveAuth: AuthService = {
  async login(creds: Credentials) {
    const s = await http<Session>(config.api.auth, '/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    });
    setAuthToken(s.token);
    return s;
  },
  async signup(payload: SignupPayload) {
    const s = await http<Session>(config.api.auth, '/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setAuthToken(s.token);
    return s;
  },
  async logout() {
    try {
      await http(config.api.auth, '/v1/auth/logout', { method: 'POST' });
    } finally {
      setAuthToken(null);
    }
  },
  async restore() {
    // Hook up secure storage (expo-secure-store) to persist the token, then
    // validate it here. Returns null until wired.
    return null;
  },
  async isUsernameTaken(name: string) {
    const r = await http<{ taken: boolean }>(
      config.api.auth,
      `/v1/auth/username-available?u=${encodeURIComponent(name)}`
    );
    return r.taken;
  },
};

export const liveWallet: WalletService = {
  getBalance: () =>
    http(config.api.wallet, '/v1/wallet/balance'),
  depositMethods: () =>
    http<PayMethod[]>(config.api.wallet, '/v1/wallet/deposit-methods'),
  withdrawMethods: () =>
    http<PayMethod[]>(config.api.wallet, '/v1/wallet/withdraw-methods'),
  deposit: (req: DepositRequest) =>
    http<TxResult>(config.api.wallet, '/v1/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify(req),
    }),
  withdraw: (req: WithdrawRequest) =>
    http<TxResult>(config.api.wallet, '/v1/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify(req),
    }),
  transactions: (filter?: string) =>
    http<Transaction[]>(
      config.api.wallet,
      `/v1/wallet/transactions${filter && filter !== 'All' ? `?type=${filter}` : ''}`
    ),
  bonuses: () => http<Bonus[]>(config.api.wallet, '/v1/wallet/bonuses'),
};

export const liveGames: GamesService = {
  list: () => http<Game[]>(config.api.games, '/v1/games'),
  byCategory: (cat: string) =>
    http<Game[]>(config.api.games, `/v1/games?category=${encodeURIComponent(cat)}`),
  search: (query: string) =>
    http<Game[]>(config.api.games, `/v1/games/search?q=${encodeURIComponent(query)}`),
  async launch(gameId: string, mode) {
    const r = await http<GameLaunch>(config.api.games, '/v1/games/launch', {
      method: 'POST',
      body: JSON.stringify({ gameId, mode }),
    });
    return r;
  },
};

export const liveContent: ContentService = {
  promotions: () => http<Promo[]>(config.api.base, '/v1/content/promotions'),
  infoPage: (slug: string) =>
    http<InfoPage | null>(config.api.base, `/v1/content/pages/${encodeURIComponent(slug)}`),
};
