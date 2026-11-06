import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { AppHeader } from '@/components/AppHeader';
import { GameTile } from '@/components/GameTile';
import { Footer } from '@/components/Footer';
import { GAMES, type Game } from '@/data/games';
import { useAuth } from '@/store/AuthContext';

export default function LiveScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const liveGames = GAMES.filter((g) => g.cat === 'live');
  const tableGames = GAMES.filter((g) => g.cat === 'table');
  const openGame = (g: Game) => router.push(`/game/${g.id}`);

  const Grid = ({ title, games }: { title: string; games: Game[] }) => (
    <View style={styles.section}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.grid}>
        {games.map((g) => (
          <View key={g.id} style={styles.item}>
            <GameTile game={g} onPress={openGame} />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader onDeposit={() => router.push(user ? '/deposit' : '/login')} onLogin={() => router.push('/login')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Live casino</Text>
        <Text style={[styles.lead, { color: colors.muted }]}>
          Real dealers, real tables, streamed in HD. Take a seat at roulette, blackjack, baccarat and game shows.
        </Text>
        <Grid title="Live tables" games={liveGames} />
        <Grid title="Table games" games={tableGames} />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 14, paddingBottom: 30 },
  pageTitle: { fontSize: 28, fontWeight: '800', marginTop: 8 },
  lead: { fontSize: 14, lineHeight: 21, marginBottom: 20, marginTop: 6 },
  section: { marginBottom: 24 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 18 },
  item: { width: '47%' },
});
