import { isLive } from './config';
import type { CasinoServices } from './types';
import { mockAuth, mockWallet, mockGames, mockContent } from './mock';
import { liveAuth, liveWallet, liveGames, liveContent } from './live';

/**
 * Service factory. The entire app imports `services` from here and never knows
 * whether it is talking to the bundled demo data or a real backend — that is
 * decided once, from config (EXPO_PUBLIC_DATA_SOURCE + API base URL).
 *
 * To add a new casino brand or backend, implement the interfaces in types.ts
 * and swap them in here.
 */
export const services: CasinoServices = isLive
  ? { auth: liveAuth, wallet: liveWallet, games: liveGames, content: liveContent }
  : { auth: mockAuth, wallet: mockWallet, games: mockGames, content: mockContent };

export * from './types';
export { config, isLive } from './config';
