import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import type { Provider } from '@/data/providers';

export function ProviderCard({ provider, onPress }: { provider: Provider; onPress?: () => void }) {
  const { colors, radius } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.panel, borderColor: colors.border, borderRadius: radius.lg + 4 }]}
    >
      <View style={[styles.mark, { backgroundColor: provider.color, borderRadius: radius.md }]}>
        <Text style={styles.markText}>{provider.mark}</Text>
      </View>
      <View>
        <Text style={[styles.name, { color: colors.text }]}>{provider.name}</Text>
        <Text style={[styles.sub, { color: colors.faint }]}>Provider</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 96,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  mark: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  markText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  name: { fontWeight: '800', fontSize: 16 },
  sub: { fontSize: 12, fontWeight: '600' },
});
