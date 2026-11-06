export interface PayMethod {
  id: string;
  name: string;
  logos: string[];
  min: number;
  max: number;
  eta: string;
  fee?: number;
}

export const DEPOSIT_METHODS: PayMethod[] = [
  { id: 'payid', name: 'PayID', logos: ['payid'], min: 20, max: 10000, eta: 'Instant', fee: 0 },
  { id: 'card', name: 'Visa / Mastercard', logos: ['visa', 'mc'], min: 20, max: 5000, eta: 'Instant', fee: 0 },
  { id: 'crypto', name: 'Crypto', logos: ['BTC', 'eth', 'USDT'], min: 30, max: 50000, eta: '~10 min', fee: 0 },
  { id: 'bank', name: 'Bank transfer', logos: ['bank'], min: 50, max: 20000, eta: '1–3 business days', fee: 0 },
];

export const WITHDRAW_METHODS: PayMethod[] = [
  { id: 'bank', name: 'Bank transfer', logos: ['bank'], min: 50, max: 10000, eta: '1–3 business days' },
  { id: 'payid', name: 'PayID', logos: ['payid'], min: 30, max: 5000, eta: 'Within 24 hours' },
  { id: 'crypto', name: 'Crypto', logos: ['BTC', 'eth', 'USDT'], min: 50, max: 50000, eta: 'Within 1 hour' },
];

/** Logos shown in footer / trust strip. */
export const PAY_STRIP = ['visa', 'mc', 'payid', 'bank', 'eth', 'BTC', 'USDT'];

/** Bundled logo images; everything else renders as a styled text chip. */
export const PAY_IMAGES: Record<string, any> = {
  payid: require('../../assets/images/pay/payid.png'),
  mc: require('../../assets/images/pay/mc.png'),
  bank: require('../../assets/images/pay/bank.png'),
  eth: require('../../assets/images/pay/eth.png'),
};
