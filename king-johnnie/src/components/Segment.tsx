import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

export function Segment<T extends string>({
  options,
  value,
  onChange,
}: {
  options: Array<[T, string]>;
  value: T;
  onChange: (v: T) => void;
}) {
  const { colors, radius } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.panel, borderRadius: radius.lg + 2 }]}>
      {options.map(([key, label]) => {
        const on = key === value;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            style={[
              styles.btn,
              { borderRadius: radius.md },
              on && { backgroundColor: colors.primarySoft, borderWidth: 1.5, borderColor: colors.primary },
            ]}
          >
            <Text style={{ color: on ? colors.primary : colors.muted, fontWeight: '700' }}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', padding: 5, gap: 6 },
  btn: { flex: 1, height: 40, alignItems: 'center', justifyContent: 'center' },
});
