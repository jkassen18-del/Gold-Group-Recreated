import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeProvider';
import { AppHeader } from '@/components/AppHeader';
import { Segment } from '@/components/Segment';
import { Button } from '@/components/Button';
import { DepositForm } from '@/components/wallet/DepositForm';
import { WithdrawForm } from '@/components/wallet/WithdrawForm';
import { useAuth } from '@/store/AuthContext';
import { money } from '@/utils/format';

export default function WalletScreen() {
  const { colors, radius } = useTheme();
  const { user } = useAuth();
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <AppHeader onDeposit={() => router.push('/login')} onLogin={() => router.push('/login')} />
        <View style={styles.empty}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Wallet</Text>
          <Text style={[styles.lead, { color: colors.muted }]}>Log in to deposit, withdraw and see your history.</Text>
          <Button label="Login" onPress={() => router.push('/login')} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader onDeposit={() => setMode('deposit')} onLogin={() => router.push('/login')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={['#2b1703', colors.panel]} style={[styles.hero, { borderRadius: radius.lg + 6 }]}>
          <Text style={{ color: colors.muted, fontSize: 12, fontWeight: '600' }}>Total balance</Text>
          <Text style={[styles.big, { color: colors.text }]}>{money(user.cash, user.currency)}</Text>
          <View style={styles.heroRow}>
            <View>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Cash</Text>
              <Text style={{ color: colors.text, fontSize: 15, fontWeight: '700' }}>{money(user.cash, user.currency)}</Text>
            </View>
            <View>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Bonus</Text>
              <Text style={{ color: colors.text, fontSize: 15, fontWeight: '700' }}>{money(user.bonus ?? 0, user.currency)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ height: 14 }} />
        <Segment
          options={[
            ['deposit', 'Deposit'],
            ['withdraw', 'Withdraw'],
          ]}
          value={mode}
          onChange={setMode}
        />
        <View style={{ height: 16 }} />

        {mode === 'deposit' ? <DepositForm /> : <WithdrawForm />}

        <Text onPress={() => router.push('/account')} style={[styles.history, { color: colors.primary }]}>
          View transaction history →
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 14, paddingBottom: 40 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 },
  pageTitle: { fontSize: 28, fontWeight: '800' },
  lead: { fontSize: 14, textAlign: 'center' },
  hero: { padding: 24, marginTop: 8 },
  big: { fontSize: 36, fontWeight: '800', marginTop: 4 },
  heroRow: { flexDirection: 'row', gap: 28, marginTop: 12 },
  history: { textAlign: 'center', marginTop: 20, fontWeight: '700' },
});
