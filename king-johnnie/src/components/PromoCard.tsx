import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Button } from './Button';
import { Icon } from './Icon';
import type { Promo } from '@/data/promos';

const hero = require('../../assets/images/hero-welcome.webp');

export function PromoCard({ promo, onPress }: { promo: Promo; onPress?: () => void }) {
  const { colors, radius } = useTheme();
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[styles.wrap, aStyle]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.98))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
      >
        <View style={[styles.card, { backgroundColor: colors.panel, borderRadius: radius.lg + 6 }]}>
          <View style={styles.imgWrap}>
            {promo.image === 'welcome' ? (
              <Image source={hero} style={StyleSheet.absoluteFill} resizeMode="cover" />
            ) : (
              <LinearGradient colors={[promo.from ?? colors.panel2, promo.to ?? colors.bg]} style={StyleSheet.absoluteFill}>
                <View style={styles.iconCenter}>
                  <Icon name={promo.icon ?? 'gift'} size={56} color="rgba(255,255,255,0.85)" strokeWidth={1.4} />
                </View>
              </LinearGradient>
            )}
          </View>
          <View style={styles.body}>
            <View style={[styles.tag, { backgroundColor: colors.panel2, borderRadius: radius.sm }]}>
              <Text style={[styles.tagText, { color: colors.muted }]}>{promo.tag}</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>{promo.title}</Text>
            <Text style={[styles.hl, { color: colors.primary }]}>{promo.hl}</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>{promo.sub}</Text>
            <Button label="Opt in" size="sm" onPress={onPress} style={{ marginTop: 12, alignSelf: 'flex-start' }} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: { overflow: 'hidden' },
  imgWrap: { aspectRatio: 16 / 8, backgroundColor: '#000' },
  iconCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 16, gap: 4 },
  tag: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, marginBottom: 2 },
  tagText: { fontSize: 11, fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '700' },
  hl: { fontSize: 14, fontWeight: '600' },
  sub: { fontSize: 13 },
});
