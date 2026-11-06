import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from '@/components/Icon';
import { TABS } from '@/data/catalog';
import { PROVIDERS } from '@/data/providers';
import { FOOTER_LINKS } from '@/data/infoPages';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';

const logo = require('../assets/images/logo.png');

export default function MenuScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const goTab = (tab: string) => {
    router.dismiss();
    router.push({ pathname: '/(tabs)', params: { tab } });
  };

  const Link = ({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) => (
    <Pressable onPress={onPress} style={styles.link}>
      <Icon name={icon} size={20} color={colors.text} />
      <Text style={[styles.linkLabel, { color: colors.text }]}>{label}</Text>
      <Icon name="chevR" size={16} color={colors.faint} />
    </Pressable>
  );

  return (
    <View style={[styles.wrap, { backgroundColor: colors.panel, paddingTop: insets.top + 8 }]}>
      <View style={styles.head}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Pressable onPress={() => router.back()} style={[styles.close, { backgroundColor: colors.panel2 }]} hitSlop={8}>
          <Icon name="close" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={[styles.section, { color: colors.faint }]}>CASINO</Text>
        {TABS.map(([key, icon, label]) => (
          <Link key={key} icon={icon} label={label} onPress={() => goTab(key)} />
        ))}

        <Text style={[styles.section, { color: colors.faint }]}>PROVIDERS</Text>
        {PROVIDERS.map((p) => (
          <Pressable key={p.id} onPress={() => goTab('all')} style={styles.link}>
            <View style={[styles.pmark, { backgroundColor: p.color }]}>
              <Text style={styles.pmarkText}>{p.mark}</Text>
            </View>
            <Text style={[styles.linkLabel, { color: colors.text }]}>{p.name}</Text>
            <Icon name="chevR" size={16} color={colors.faint} />
          </Pressable>
        ))}

        <Text style={[styles.section, { color: colors.faint }]}>ACCOUNT</Text>
        <Link icon="wallet" label="Wallet" onPress={() => { router.dismiss(); router.push('/(tabs)/wallet'); }} />
        <Link icon="user" label="My account" onPress={() => { router.dismiss(); router.push('/account'); }} />
        <Link icon="gift" label="Promotions" onPress={() => { router.dismiss(); router.push('/(tabs)/promos'); }} />
        <Link icon="chat" label="Contact & support" onPress={() => { router.dismiss(); router.push('/contact'); }} />

        <Text style={[styles.section, { color: colors.faint }]}>INFO</Text>
        {FOOTER_LINKS.map((l) => (
          <Link key={l.slug} icon="layers" label={l.label} onPress={() => { router.dismiss(); router.push(`/info/${l.slug}`); }} />
        ))}

        {user && (
          <Pressable
            onPress={async () => {
              await logout();
              toast('Logged out', 'logout');
              router.back();
            }}
            style={[styles.link, { marginTop: 12 }]}
          >
            <Icon name="logout" size={20} color={colors.danger} />
            <Text style={[styles.linkLabel, { color: colors.danger }]}>Log out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  logo: { height: 36, width: 120 },
  close: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  section: { fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginTop: 20, marginBottom: 8 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 14, height: 48, paddingHorizontal: 10, borderRadius: 10 },
  linkLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  pmark: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  pmarkText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});
