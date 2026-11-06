import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { AppHeader } from '@/components/AppHeader';
import { HeroCarousel } from '@/components/HeroCarousel';
import { CategoryTabs } from '@/components/CategoryTabs';
import { SectionRail } from '@/components/SectionRail';
import { GameTile } from '@/components/GameTile';
import { ProviderCard } from '@/components/ProviderCard';
import { Icon } from '@/components/Icon';
import { GAMES, type Game } from '@/data/games';
import { PROVIDERS } from '@/data/providers';
import { useAuth } from '@/store/AuthContext';
import { Footer } from '@/components/Footer';

export default function LobbyScreen() {
  const { colors, radius } = useTheme();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState('all');

  useEffect(() => {
    if (params.tab) setTab(params.tab);
  }, [params.tab]);

  const onDeposit = () => router.push(user ? '/deposit' : '/login');
  const onLogin = () => router.push('/login');
  const openGame = (g: Game) => router.push(`/game/${g.id}`);

  const rails = useMemo(() => {
    const by = (fn: (g: Game) => boolean) => GAMES.filter(fn);
    return {
      top: [...GAMES].sort((a, b) => a.pop - b.pop).slice(0, 12),
      hot: by((g) => !!g.tags?.includes('hot')),
      new: by((g) => !!g.tags?.includes('new')),
      originals: by((g) => g.cat === 'originals'),
      pokies: by((g) => g.cat === 'pokies'),
      jackpot: by((g) => g.cat === 'jackpot'),
      live: by((g) => g.cat === 'live'),
    };
  }, []);

  const grid = useMemo(() => {
    if (tab === 'all' || tab === 'top') return null;
    if (tab === 'hot') return GAMES.filter((g) => g.tags?.includes('hot'));
    if (tab === 'new') return GAMES.filter((g) => g.tags?.includes('new'));
    return GAMES.filter((g) => g.cat === tab);
  }, [tab]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader onDeposit={onDeposit} onLogin={onLogin} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroCarousel onDeposit={onDeposit} onPromos={() => router.push('/(tabs)/promos')} />

        <View style={styles.tabsWrap}>
          <CategoryTabs active={tab} onChange={setTab} />
        </View>

        {grid ? (
          <View style={styles.gridSection}>
            <Text style={[styles.gridTitle, { color: colors.text }]}>
              {GAMES.filter((g) => (tab === 'hot' || tab === 'new' ? g.tags?.includes(tab as any) : g.cat === tab)).length} games
            </Text>
            <View style={styles.grid}>
              {grid.map((g) => (
                <View key={g.id} style={styles.gridItem}>
                  <GameTile game={g} onPress={openGame} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <>
            <SectionRail title="Top 50" games={rails.top} onPressGame={openGame} onViewAll={() => setTab('top')} />
            <SectionRail title="Hot right now" games={rails.hot} onPressGame={openGame} onViewAll={() => setTab('hot')} />
            <SectionRail title="New releases" games={rails.new} onPressGame={openGame} onViewAll={() => setTab('new')} />
            <SectionRail title="King Johnnie Originals" games={rails.originals} onPressGame={openGame} onViewAll={() => setTab('originals')} />

            <View style={styles.section}>
              <Text style={[styles.secTitle, { color: colors.text }]}>Top providers</Text>
              <FlatList
                horizontal
                data={PROVIDERS}
                keyExtractor={(p) => p.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
                renderItem={({ item }) => <ProviderCard provider={item} onPress={() => router.push('/(tabs)/promos')} />}
              />
            </View>

            <SectionRail title="Jackpots" games={rails.jackpot} onPressGame={openGame} onViewAll={() => setTab('jackpot')} />
            <SectionRail title="Live dealer" games={rails.live} onPressGame={openGame} onViewAll={() => router.push('/(tabs)/live')} />
          </>
        )}

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 14, paddingBottom: 30 },
  tabsWrap: { marginVertical: 10 },
  section: { marginBottom: 26 },
  secTitle: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  gridSection: { marginTop: 8 },
  gridTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 18 },
  gridItem: { width: '31%' },
});
