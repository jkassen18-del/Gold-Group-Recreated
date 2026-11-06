import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/theme/ThemeProvider';
import { GameArt } from './art/GameArt';
import { Badge, type BadgeKind } from './Badge';
import { Icon } from './Icon';
import { useFavorites } from '@/store/FavoritesContext';
import { providerById } from '@/data/providers';
import { compact } from '@/utils/format';
import type { Game } from '@/data/games';

export interface GameTileProps {
  game: Game;
  /** fixed pixel width (rails) or omit to fill the parent (grid) */
  width?: number;
  onPress?: (game: Game) => void;
}

function topBadge(game: Game): { kind: BadgeKind; label: string } | null {
  if (game.cat === 'live') return { kind: 'live', label: 'LIVE' };
  if (game.tags?.includes('hot')) return { kind: 'hot', label: 'Hot' };
  if (game.tags?.includes('new')) return { kind: 'new', label: 'New' };
  if (game.jackpot) return { kind: 'default', label: 'JACKPOT' };
  return null;
}

export function GameTile({ game, width, onPress }: GameTileProps) {
  const { colors, radius } = useTheme();
  const { isFav, toggle } = useFavorites();
  const fav = isFav(game.id);
  const scale = useSharedValue(1);
  const lift = useSharedValue(0);
  const heartScale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: lift.value }],
  }));
  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: heartScale.value }] }));

  const badge = topBadge(game);
  const prov = providerById(game.prov);

  const onFav = () => {
    const now = toggle(game.id);
    heartScale.value = withSpring(now ? 1.4 : 1, { damping: 6 }, () => {
      heartScale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const strip =
    game.jackpot != null
      ? `$${game.jackpot.toLocaleString('en-AU')}`
      : game.players != null
        ? `${compact(game.players)} playing`
        : null;

  return (
    <Animated.View style={[{ width: width ?? '100%' }, cardStyle]}>
      <Pressable
        onPress={() => {
          Haptics.selectionAsync().catch(() => {});
          onPress?.(game);
        }}
        onPressIn={() => {
          scale.value = withSpring(0.97);
          lift.value = withTiming(-4, { duration: 160 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
          lift.value = withTiming(0, { duration: 220 });
        }}
      >
        <View style={[styles.thumb, { borderRadius: radius.lg + 4 }]}>
          <GameArt game={game} />
          {badge && (
            <View style={styles.badgeWrap}>
              <Badge kind={badge.kind} label={badge.label} />
            </View>
          )}
          <Pressable style={styles.heart} onPress={onFav} hitSlop={8}>
            <Animated.View style={heartStyle}>
              <Icon name="heart" size={22} color={fav ? colors.primary : '#fff'} fill={fav} />
            </Animated.View>
          </Pressable>
          {strip && (
            <View style={styles.strip}>
              <Text style={styles.stripText}>{strip}</Text>
            </View>
          )}
        </View>
      </Pressable>
      <Text numberOfLines={1} style={[styles.prov, { color: colors.text }]}>
        {prov?.name ?? game.prov}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  thumb: {
    aspectRatio: 3 / 4,
    overflow: 'hidden',
    backgroundColor: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  badgeWrap: { position: 'absolute', top: 10, left: 10, zIndex: 2 },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  strip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  stripText: { color: '#fff', textAlign: 'center', fontSize: 13, fontWeight: '800' },
  prov: { textAlign: 'center', fontSize: 14, fontWeight: '600', marginTop: 10 },
});
