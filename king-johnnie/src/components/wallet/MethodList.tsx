import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { PayLogo } from '@/components/PayLogo';
import type { PayMethod } from '@/data/methods';

export function MethodList({
  methods,
  selected,
  onSelect,
}: {
  methods: PayMethod[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const { colors, radius } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {methods.map((m) => {
        const on = m.id === selected;
        return (
          <Pressable
            key={m.id}
            onPress={() => onSelect(m.id)}
            style={[
              styles.row,
              { backgroundColor: colors.panel2, borderRadius: radius.lg },
              on && { borderColor: colors.primary, backgroundColor: colors.primarySoft },
            ]}
          >
            <View style={styles.logos}>
              {m.logos.map((l) => (
                <PayLogo key={l} id={l} />
              ))}
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.text }]}>{m.name}</Text>
              <Text style={[styles.sub, { color: colors.faint }]}>
                {m.eta} · ${m.min}–${m.max.toLocaleString('en-AU')}
              </Text>
            </View>
            <View style={[styles.radio, { borderColor: on ? colors.primary : colors.faint }]}>
              {on && <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  logos: { flexDirection: 'row', gap: 4 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700' },
  sub: { fontSize: 12 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
});
