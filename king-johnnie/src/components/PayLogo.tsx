import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PAY_IMAGES } from '@/data/methods';

/**
 * Renders a payment-method logo. Known logos use bundled PNGs; everything else
 * (BTC, USDT, visa, ...) renders as a styled text chip so no extra assets are
 * needed.
 */
export function PayLogo({ id, size = 'sm' }: { id: string; size?: 'sm' | 'lg' }) {
  const img = PAY_IMAGES[id];
  const h = size === 'lg' ? 34 : 26;

  if (img) {
    return (
      <View style={[styles.logo, { height: h }]}>
        <Image source={img} style={{ height: h - 10, width: size === 'lg' ? 56 : 44 }} resizeMode="contain" />
      </View>
    );
  }
  return (
    <View style={[styles.logo, styles.txt, { height: h }]}>
      <Text style={styles.txtLabel}>{id.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    minWidth: 44,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: { backgroundColor: '#2a2a2a' },
  txtLabel: { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.4 },
});
