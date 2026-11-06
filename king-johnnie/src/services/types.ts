import type { Game } from '@/data/games';
import type { Promo } from '@/data/promos';
import type { InfoPage } from '@/data/infoPages';
import type { PayMethod } from '@/data/methods';
import type { Transaction, Bonus } from '@/data/account';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  first?: string;
  last?: string;
  address?: string;
  /** cash balance in minor-unit-free currency (AUD) */
  cash: number;
  bonus?: number;
  currency: string;
  kyc: 'pending' | 'verified' | 'rejected';
}

export interface Session {
  user: User;
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  country: string;
  dialCode: string;
  phone: string;
  acceptedTerms: boolean;
}

export interface DepositRequest {
  method: string;
  amount: number;
  bonusCode?: string;
  coin?: string;
}

export interface WithdrawRequest {
  method: string;
  amount: number;
  details: Record<string, string>;
}

export interface TxResult {
  ok: boolean;
  reference?: string;
  message?: string;
  newBalance?: number;
}

export interface GameLaunch {
  /** URL to load in a WebView; empty in mock mode (renders demo canvas). */
  url: string;
  mode: 'real' | 'demo';
}

/** The full connector surface the UI depends on. Swap the implementation
 *  (mock ↔ live) without touching any screen. */
export interface CasinoServices {
  auth: AuthService;
  wallet: WalletService;
  games: GamesService;
  content: ContentService;
}

export interface AuthService {
  login(creds: Credentials): Promise<Session>;
  signup(payload: SignupPayload): Promise<Session>;
  logout(): Promise<void>;
  restore(): Promise<Session | null>;
  isUsernameTaken(name: string): Promise<boolean>;
}

export interface WalletService {
  getBalance(): Promise<{ cash: number; bonus: number; currency: string }>;
  depositMethods(): Promise<PayMethod[]>;
  withdrawMethods(): Promise<PayMethod[]>;
  deposit(req: DepositRequest): Promise<TxResult>;
  withdraw(req: WithdrawRequest): Promise<TxResult>;
  transactions(filter?: string): Promise<Transaction[]>;
  bonuses(): Promise<Bonus[]>;
}

export interface GamesService {
  list(): Promise<Game[]>;
  byCategory(cat: string): Promise<Game[]>;
  search(query: string): Promise<Game[]>;
  launch(gameId: string, mode: 'real' | 'demo'): Promise<GameLaunch>;
}

export interface ContentService {
  promotions(): Promise<Promo[]>;
  infoPage(slug: string): Promise<InfoPage | null>;
}
