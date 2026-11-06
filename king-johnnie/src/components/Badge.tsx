import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';

export type BadgeKind = 'hot' | 'new' | 'live' | 'default';

export function Badge({ kind, label }: { kind: BadgeKind; label: string }) {
  const { colors, radius } = useTheme();
  const blink = useSharedValue(1);

  useEffect(() => {
    if (kind === 'live') {
      blink.value = withRepeat(withTiming(0.3, { duration: 700 }), -1, true);
    }
  }, [kind, blink]);

  const dotStyle = useAnimatedStyle(() => ({ opacity: blink.value }));

  const bg =
    kind === 'hot' ? colors.hot : kind === 'new' ? colors.primary : kind === 'live' ? colors.live : '#f2f2f2';
  const fg = kind === 'default' ? '#111' : '#fff';

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderRadius: radius.md }]}>
      {kind === 'live' && <Animated.View style={[styles.dot, dotStyle]} />}
      <Text style={[styles.text, { color: fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  text: { fontSize: 12, fontWeight: '700' },
});
