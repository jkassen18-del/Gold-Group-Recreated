import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { AppHeader } from '@/components/AppHeader';
import { PromoCard } from '@/components/PromoCard';
import { Footer } from '@/components/Footer';
import { PROMOS } from '@/data/promos';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';

export default function PromosScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  const optIn = () => {
    if (!user) return router.push('/login');
    toast('Promotion opted in', 'gift');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader onDeposit={() => router.push(user ? '/deposit' : '/login')} onLogin={() => router.push('/login')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Promotions</Text>
        <Text style={[styles.lead, { color: colors.muted }]}>
          Bonuses, reloads, cashback and tournaments. Opt in and the rewards stack up as you play.
        </Text>
        <View style={styles.grid}>
          {PROMOS.map((p) => (
            <View key={p.id} style={styles.item}>
              <PromoCard promo={p} onPress={optIn} />
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 14, paddingBottom: 30 },
  pageTitle: { fontSize: 28, fontWeight: '800', marginTop: 8 },
  lead: { fontSize: 14, lineHeight: 21, marginBottom: 20, marginTop: 6 },
  grid: { gap: 18 },
  item: { width: '100%' },
});
