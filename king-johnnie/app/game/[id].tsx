import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from '@/components/Icon';
import { Segment } from '@/components/Segment';
import { GameArt } from '@/components/art/GameArt';
import { gameById } from '@/data/games';
import { providerById } from '@/data/providers';
import { services, type GameLaunch } from '@/services';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';

export default function GamePlayer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { toast } = useToast();
  const game = gameById(String(id));
  const [mode, setMode] = useState<'real' | 'demo'>(user ? 'real' : 'demo');
  const [launch, setLaunch] = useState<GameLaunch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!game) return;
    setLoading(true);
    services.games
      .launch(game.id, mode)
      .then(setLaunch)
      .finally(() => setTimeout(() => setLoading(false), 700));
  }, [game, mode]);

  if (!game) {
    return (
      <View style={[styles.wrap, { backgroundColor: '#000', paddingTop: insets.top }]}>
        <Text style={{ color: '#fff', padding: 20 }}>Game not found.</Text>
      </View>
    );
  }

  const prov = providerById(game.prov);

  const switchMode = (m: 'real' | 'demo') => {
    if (m === 'real' && !user) {
      toast('Log in to play for real', 'lock');
      router.push('/login');
      return;
    }
    setMode(m);
  };

  return (
    <View style={[styles.wrap, { backgroundColor: '#000', paddingTop: insets.top }]}>
      <View style={[styles.bar, { backgroundColor: colors.panel, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.iconBtn}>
          <Icon name="close" size={22} color={colors.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontWeight: '700' }} numberOfLines={1}>
            {game.title}
          </Text>
          <Text style={{ color: colors.faint, fontSize: 12 }}>{prov?.name}</Text>
        </View>
        <View style={{ width: 170 }}>
          <Segment
            options={[
              ['real', 'Real'],
              ['demo', 'Demo'],
            ]}
            value={mode}
            onChange={(m) => switchMode(m as 'real' | 'demo')}
          />
        </View>
      </View>

      <View style={styles.stage}>
        {launch?.url ? (
          <WebView
            source={{ uri: launch.url }}
            style={{ flex: 1, backgroundColor: '#000' }}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
          />
        ) : (
          <View style={styles.demoStage}>
            <View style={styles.ambient}>
              <GameArt game={game} showTitle={false} />
            </View>
            {loading ? (
              <Animated.View entering={FadeIn} style={[styles.loader, { backgroundColor: 'rgba(0,0,0,0.65)' }]}>
                <ActivityIndicator color={colors.primary} size="large" />
                <Text style={{ color: colors.text, fontWeight: '700', marginTop: 10 }}>Loading {game.title}…</Text>
                <Text style={{ color: colors.faint, fontSize: 12 }}>{prov?.name}</Text>
              </Animated.View>
            ) : (
              <Animated.View entering={FadeIn} style={styles.frame}>
                <View style={styles.frameArt}>
                  <GameArt game={game} />
                </View>
                <View style={[styles.demoBanner, { backgroundColor: colors.panel, borderColor: colors.primary }]}>
                  <Text style={{ color: colors.text, fontWeight: '600', fontSize: 13 }}>
                    {mode === 'demo'
                      ? 'Demo mode — no real money. '
                      : 'Real play. Set a game URL in EXPO_PUBLIC_GAME_LAUNCH_URL to embed the live game.'}
                  </Text>
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  bar: { height: 56, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, borderBottomWidth: 1 },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  stage: { flex: 1 },
  demoStage: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  ambient: { ...StyleSheet.absoluteFillObject, opacity: 0.25, transform: [{ scale: 1.3 }] },
  loader: { padding: 24, borderRadius: 16, alignItems: 'center' },
  frame: { width: '86%', maxWidth: 420, aspectRatio: 9 / 16, borderRadius: 16, overflow: 'hidden' },
  frameArt: { ...StyleSheet.absoluteFillObject },
  demoBanner: { position: 'absolute', bottom: 16, left: 12, right: 12, padding: 12, borderRadius: 12, borderWidth: 1 },
});
