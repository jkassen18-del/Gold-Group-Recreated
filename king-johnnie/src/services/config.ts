import Constants from 'expo-constants';

/**
 * Central runtime configuration. Reads EXPO_PUBLIC_* env vars (see .env.example)
 * and falls back to values in app.json -> expo.extra. Nothing here is secret;
 * secrets belong on the server, never in the client bundle.
 */

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string>;

function env(key: string, fallback = ''): string {
  // process.env.EXPO_PUBLIC_* is inlined by the Expo bundler.
  const v = (process.env as Record<string, string | undefined>)[key];
  return (v ?? '').trim() || fallback;
}

const apiBase = env('EXPO_PUBLIC_API_BASE_URL', extra.apiBaseUrl || '');

export const config = {
  /** 'mock' (offline demo data) or 'live' (REST backend). */
  dataSource: (env('EXPO_PUBLIC_DATA_SOURCE', extra.dataSource || 'mock') as 'mock' | 'live'),

  api: {
    base: apiBase,
    auth: env('EXPO_PUBLIC_AUTH_BASE_URL', apiBase),
    wallet: env('EXPO_PUBLIC_WALLET_BASE_URL', apiBase),
    games: env('EXPO_PUBLIC_GAMES_BASE_URL', apiBase),
  },

  gameLaunchUrl: env('EXPO_PUBLIC_GAME_LAUNCH_URL', ''),
  supportChatUrl: env('EXPO_PUBLIC_SUPPORT_CHAT_URL', ''),
  analyticsKey: env('EXPO_PUBLIC_ANALYTICS_KEY', ''),

  defaultCurrency: env('EXPO_PUBLIC_DEFAULT_CURRENCY', 'AUD'),
  defaultLocale: env('EXPO_PUBLIC_DEFAULT_LOCALE', 'en'),
} as const;

export const isLive = config.dataSource === 'live' && !!config.api.base;
