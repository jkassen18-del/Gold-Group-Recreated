import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from '@/components/Icon';
import { Button } from '@/components/Button';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';
import { ACCOUNT_TABS, ACCOUNT_MOCK, TX_FILTERS } from '@/data/account';
import { money } from '@/utils/format';

export default function AccountScreen() {
  const { colors, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState(params.tab ?? 'profile');

  if (!user) {
    return (
      <View style={[styles.wrap, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}>
        <Header title="My account" colors={colors} />
        <View style={styles.empty}>
          <Text style={{ color: colors.muted, marginBottom: 14 }}>Log in to manage your account.</Text>
          <Button label="Login" onPress={() => router.push('/login')} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}>
      <Header title="My account" colors={colors} />

      <View style={[styles.who, { borderBottomColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          <Icon name="user" size={22} color={colors.primary} />
        </View>
        <View>
          <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16 }}>{user.name}</Text>
          <Text style={{ color: colors.faint, fontSize: 12 }}>{user.email}</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <Text style={{ color: colors.faint, fontSize: 12 }}>Balance</Text>
          <Text style={{ color: colors.text, fontWeight: '800' }}>{money(user.cash, user.currency)}</Text>
        </View>
      </View>

      <FlatList
        horizontal
        data={ACCOUNT_TABS}
        keyExtractor={(t) => t[0]}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.tabs}
        renderItem={({ item: [key, icon, label] }) => {
          const on = key === tab;
          return (
            <Pressable
              onPress={() => setTab(key)}
              style={[styles.tab, { backgroundColor: on ? colors.primarySoft : colors.panel2, borderRadius: radius.md }, on && { borderWidth: 1.5, borderColor: colors.primary }]}
            >
              <Icon name={icon} size={16} color={on ? colors.primary : colors.text} />
              <Text style={{ color: on ? colors.primary : colors.text, fontWeight: '600', fontSize: 13 }}>{label}</Text>
            </Pressable>
          );
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'profile' && <Profile user={user} colors={colors} radius={radius} />}
        {tab === 'security' && <Security colors={colors} radius={radius} onSave={() => toast('Password updated', 'lock')} />}
        {tab === 'transactions' && <Transactions colors={colors} radius={radius} />}
        {tab === 'bonuses' && <Bonuses colors={colors} radius={radius} />}
        {tab === 'verification' && <Verification colors={colors} radius={radius} onUpload={() => toast('Documents uploaded', 'check')} />}
        {tab === 'limits' && <Limits colors={colors} radius={radius} onSave={() => toast('Limits saved', 'check')} />}
        {tab === 'sessions' && <Sessions colors={colors} radius={radius} />}
        {tab === 'prefs' && <Prefs colors={colors} radius={radius} />}

        <Button
          label="Log out"
          variant="outline"
          icon="logout"
          onPress={async () => {
            await logout();
            toast('Logged out', 'logout');
            router.replace('/(tabs)');
          }}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
}

function Header({ title, colors }: { title: string; colors: any }) {
  return (
    <View style={styles.head}>
      <Pressable onPress={() => router.back()} style={[styles.back, { backgroundColor: colors.panel2 }]} hitSlop={8}>
        <Icon name="chevL" size={20} color={colors.text} />
      </Pressable>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    </View>
  );
}

function Card({ children, colors, radius }: any) {
  return <View style={[styles.card, { backgroundColor: colors.panel, borderRadius: radius.lg + 4 }]}>{children}</View>;
}

function KV({ k, v, colors, status }: { k: string; v: string; colors: any; status?: 'ok' | 'pend' | 'bad' }) {
  const sc = status === 'ok' ? colors.success : status === 'bad' ? colors.danger : colors.primary;
  return (
    <View style={[styles.kv, { borderBottomColor: colors.border }]}>
      <Text style={{ color: colors.muted }}>{k}</Text>
      {status ? (
        <View style={[styles.status, { backgroundColor: sc + '22' }]}>
          <Text style={{ color: sc, fontSize: 12, fontWeight: '700' }}>{v}</Text>
        </View>
      ) : (
        <Text style={{ color: colors.text, fontWeight: '600' }}>{v}</Text>
      )}
    </View>
  );
}

function Profile({ user, colors, radius }: any) {
  return (
    <Card colors={colors} radius={radius}>
      <KV k="Username" v={user.name} colors={colors} />
      <KV k="Email" v={user.email} colors={colors} />
      <KV k="Phone" v={user.phone} colors={colors} />
      <KV k="Currency" v={user.currency} colors={colors} />
      <KV k="Verification" v={user.kyc === 'verified' ? 'Verified' : 'Pending'} colors={colors} status={user.kyc === 'verified' ? 'ok' : 'pend'} />
    </Card>
  );
}

function Security({ colors, radius, onSave }: any) {
  return (
    <Card colors={colors} radius={radius}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Password & 2FA</Text>
      <Text style={{ color: colors.muted, marginBottom: 14 }}>Keep your account secure with a strong password and two-factor authentication.</Text>
      <Button label="Change password" variant="dark" onPress={onSave} />
    </Card>
  );
}

function Transactions({ colors, radius }: any) {
  const [filter, setFilter] = useState<string>('All');
  const txs = ACCOUNT_MOCK.txs.filter((t) => filter === 'All' || t.type === filter);
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.filters}>
        {TX_FILTERS.map((f) => {
          const on = f === filter;
          return (
            <Pressable key={f} onPress={() => setFilter(f)} style={[styles.chip, { backgroundColor: on ? colors.primarySoft : colors.panel2, borderRadius: radius.sm }, on && { borderWidth: 1.5, borderColor: colors.primary }]}>
              <Text style={{ color: on ? colors.primary : colors.text, fontWeight: '700', fontSize: 13 }}>{f}</Text>
            </Pressable>
          );
        })}
      </View>
      <Card colors={colors} radius={radius}>
        {txs.map((t, i) => (
          <View key={t.id} style={[styles.tx, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{t.type}</Text>
              <Text style={{ color: colors.faint, fontSize: 12 }}>{t.method} · {t.date}</Text>
            </View>
            <Text style={{ color: t.amount < 0 ? colors.danger : colors.success, fontWeight: '800' }}>
              {t.amount < 0 ? '-' : '+'}{money(Math.abs(t.amount))}
            </Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

function Bonuses({ colors, radius }: any) {
  return (
    <View style={{ gap: 12 }}>
      {ACCOUNT_MOCK.bonuses.map((b, i) => (
        <Card key={i} colors={colors} radius={radius}>
          <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
            <View style={[styles.bico, { backgroundColor: colors.primarySoft }]}>
              <Icon name={b.icon} size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{b.name}</Text>
              <Text style={{ color: colors.faint, fontSize: 12 }}>{b.detail}</Text>
            </View>
          </View>
          {b.wager > 0 && (
            <>
              <View style={[styles.progress, { backgroundColor: '#333' }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${Math.round(b.wager * 100)}%` }]} />
              </View>
              <Text style={{ color: colors.faint, fontSize: 12 }}>Wagering {Math.round(b.wager * 100)}% · {b.expires}</Text>
            </>
          )}
          {b.spins && <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '700', marginTop: 8 }}>{b.spins} · {b.expires}</Text>}
        </Card>
      ))}
    </View>
  );
}

function Verification({ colors, radius, onUpload }: any) {
  return (
    <Card colors={colors} radius={radius}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Identity verification (KYC)</Text>
      <KV k="Status" v={ACCOUNT_MOCK.kyc === 'verified' ? 'Verified' : 'Pending review'} colors={colors} status={ACCOUNT_MOCK.kyc === 'verified' ? 'ok' : 'pend'} />
      <Text style={{ color: colors.muted, marginVertical: 14 }}>Upload a government ID and a proof of address to unlock withdrawals.</Text>
      <Button label="Upload documents" icon="shield" onPress={onUpload} />
    </Card>
  );
}

function Limits({ colors, radius, onSave }: any) {
  const L = ACCOUNT_MOCK.limits;
  return (
    <Card colors={colors} radius={radius}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Responsible gaming limits</Text>
      <KV k="Daily deposit limit" v={money(L.daily)} colors={colors} />
      <KV k="Weekly deposit limit" v={money(L.weekly)} colors={colors} />
      <KV k="Session reminder" v={`${L.session} min`} colors={colors} />
      <KV k="Reality check" v={`${L.reality} min`} colors={colors} />
      <Button label="Update limits" variant="dark" onPress={onSave} style={{ marginTop: 14 }} />
    </Card>
  );
}

function Sessions({ colors, radius }: any) {
  return (
    <Card colors={colors} radius={radius}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Active sessions</Text>
      {ACCOUNT_MOCK.sessions.map((s, i) => (
        <View key={i} style={[styles.kv, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{s.device}</Text>
            <Text style={{ color: colors.faint, fontSize: 12 }}>{s.where} · {s.when}</Text>
          </View>
          {s.current ? (
            <View style={[styles.status, { backgroundColor: colors.success + '22' }]}>
              <Text style={{ color: colors.success, fontSize: 12, fontWeight: '700' }}>This device</Text>
            </View>
          ) : (
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 13 }}>Revoke</Text>
          )}
        </View>
      ))}
    </Card>
  );
}

function Prefs({ colors, radius }: any) {
  const [prefs, setPrefs] = useState(ACCOUNT_MOCK.prefs);
  const rows: Array<[keyof typeof prefs, string, string]> = [
    ['email', 'Email notifications', 'Promotions and account updates'],
    ['sms', 'SMS notifications', 'Occasional offers by text'],
    ['push', 'Push notifications', 'Real-time alerts on this device'],
    ['twofa', 'Two-factor auth', 'Extra security on login'],
  ];
  return (
    <Card colors={colors} radius={radius}>
      {rows.map(([key, title, sub], i) => (
        <View key={key} style={[styles.toggleRow, i < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{title}</Text>
            <Text style={{ color: colors.faint, fontSize: 12 }}>{sub}</Text>
          </View>
          <Pressable
            onPress={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
            style={[styles.sw, { backgroundColor: prefs[key] ? colors.primary : '#3a3a3a' }]}
          >
            <View style={[styles.swDot, prefs[key] && { transform: [{ translateX: 18 }] }]} />
          </Pressable>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingBottom: 8 },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  who: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  tabs: { gap: 8, paddingHorizontal: 14, paddingVertical: 12 },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 38, paddingHorizontal: 14 },
  content: { paddingHorizontal: 14, paddingBottom: 40 },
  card: { padding: 18 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  kv: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  status: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
  filters: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { height: 34, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  tx: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  bico: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  progress: { height: 6, borderRadius: 3, overflow: 'hidden', marginTop: 12 },
  progressFill: { height: '100%', borderRadius: 3 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  sw: { width: 42, height: 24, borderRadius: 12, padding: 3, justifyContent: 'center' },
  swDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
});
