import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from './Icon';
import { TABS } from '@/data/catalog';

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  const { colors, radius } = useTheme();

  return (
    <FlatList
      horizontal
      data={TABS}
      keyExtractor={(t) => t[0]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      renderItem={({ item: [key, icon, label] }) => {
        const on = key === active;
        return (
          <Pressable
            onPress={() => onChange(key)}
            style={[
              styles.tab,
              { backgroundColor: on ? colors.primarySoft : colors.panel2, borderRadius: radius.md },
              on && { borderWidth: 1.5, borderColor: colors.primary },
            ]}
          >
            <Icon name={icon} size={16} color={on ? colors.primary : colors.text} />
            <Text style={[styles.label, { color: on ? colors.primary : colors.text }]}>{label}</Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 4 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
  },
  label: { fontWeight: '700', fontSize: 14 },
});
