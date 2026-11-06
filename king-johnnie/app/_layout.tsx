import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { AuthProvider } from '@/store/AuthContext';
import { FavoritesProvider } from '@/store/FavoritesContext';
import { ToastProvider } from '@/components/Toast';
import { palette } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: palette.bgDeep }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <ToastProvider>
                <StatusBar style="light" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: palette.bgDeep },
                    animation: 'slide_from_right',
                  }}
                >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="menu" options={{ presentation: 'modal', animation: 'slide_from_left' }} />
                  <Stack.Screen name="login" options={{ presentation: 'modal', animation: 'fade' }} />
                  <Stack.Screen name="signup" options={{ presentation: 'modal', animation: 'fade' }} />
                  <Stack.Screen name="deposit" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                  <Stack.Screen name="game/[id]" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
                  <Stack.Screen name="account" />
                  <Stack.Screen name="contact" />
                  <Stack.Screen name="info/[slug]" />
                </Stack>
              </ToastProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
