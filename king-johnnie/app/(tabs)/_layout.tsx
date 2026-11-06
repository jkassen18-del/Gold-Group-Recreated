import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from '@/components/Icon';

export default function TabsLayout() {
  const { colors } = useTheme();

  const tab = (name: IconName) =>
    ({ color, size }: { color: string; size: number }) =>
      <Icon name={name} size={size - 2} color={color} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 86 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Casino', tabBarIcon: tab('spade') }} />
      <Tabs.Screen name="live" options={{ title: 'Live', tabBarIcon: tab('live') }} />
      <Tabs.Screen name="promos" options={{ title: 'Promos', tabBarIcon: tab('gift') }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet', tabBarIcon: tab('wallet') }} />
    </Tabs>
  );
}
