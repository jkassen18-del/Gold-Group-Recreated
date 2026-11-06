import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from './Icon';
import { Button } from './Button';
import { useAuth } from '@/store/AuthContext';
import { money } from '@/utils/format';

const logo = require('../../assets/images/logo.png');

export function AppHeader({ onDeposit, onLogin }: { onDeposit: () => void; onLogin: () => void }) {
  const { colors, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8, backgroundColor: colors.bgDeep }]}>
      <View style={[styles.header, { backgroundColor: colors.panel, borderRadius: radius.lg + 6 }]}>
        <Pressable onPress={() => router.push('/menu')} hitSlop={8} style={styles.menuBtn}>
          <Icon name="grid" size={22} color={colors.text} />
        </Pressable>
        <Pressable onPress={() => router.push('/(tabs)')}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Pressable>
        <View style={styles.right}>
          {user ? (
            <>
              <Pressable
                onPress={() => router.push('/(tabs)/wallet')}
                style={[styles.balance, { backgroundColor: colors.panel2, borderRadius: radius.md }]}
              >
                <Text style={[styles.balanceText, { color: colors.text }]}>{money(user.cash, user.currency)}</Text>
              </Pressable>
              <Button label="" icon="plus" size="sm" onPress={onDeposit} style={styles.plus} />
              <Pressable
                onPress={() => router.push('/account')}
                style={[styles.avatar, { backgroundColor: colors.panel2, borderRadius: 20 }]}
              >
                <Icon name="user" size={20} color={colors.text} />
              </Pressable>
            </>
          ) : (
            <>
              <Button label="Login" variant="dark" size="sm" onPress={onLogin} />
              <Button label="Join" size="sm" onPress={() => router.push('/signup')} />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 14, paddingBottom: 4 },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  menuBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  logo: { height: 34, width: 110 },
  right: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 8 },
  balance: { height: 38, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  balanceText: { fontWeight: '700', fontSize: 13 },
  plus: { width: 44 },
  avatar: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});
