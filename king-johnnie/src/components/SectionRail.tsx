import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { GameTile } from './GameTile';
import { Icon } from './Icon';
import type { Game } from '@/data/games';

export interface SectionRailProps {
  title: string;
  games: Game[];
  onPressGame: (g: Game) => void;
  onViewAll?: () => void;
  tileWidth?: number;
}

/** Horizontal, snap-scrolling rail of game tiles with a section header. */
export function SectionRail({ title, games, onPressGame, onViewAll, tileWidth = 150 }: SectionRailProps) {
  const { colors } = useTheme();
  if (!games.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {onViewAll && (
          <Text onPress={onViewAll} style={[styles.viewAll, { color: colors.muted }]}>
            View all <Icon name="chevR" size={14} color={colors.muted} />
          </Text>
        )}
      </View>
      <FlatList
        horizontal
        data={games}
        keyExtractor={(g) => g.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={tileWidth + 14}
        decelerationRate="fast"
        contentContainerStyle={{ gap: 14, paddingHorizontal: 2, paddingVertical: 4 }}
        renderItem={({ item }) => <GameTile game={item} width={tileWidth} onPress={onPressGame} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 26 },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2 },
  viewAll: { fontSize: 14, fontWeight: '600' },
});
