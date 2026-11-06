import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from '@/components/Icon';
import { DepositForm } from '@/components/wallet/DepositForm';

export default function DepositModal() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg, paddingTop: insets.top + 10 }]}>
      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.text }]}>Deposit</Text>
        <Pressable onPress={() => router.back()} style={[styles.close, { backgroundColor: colors.panel2 }]} hitSlop={8}>
          <Icon name="close" size={18} color={colors.text} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <DepositForm onDone={() => router.back()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 },
  title: { fontSize: 22, fontWeight: '800' },
  close: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 16, paddingBottom: 40 },
});
