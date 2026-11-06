import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeProvider';
import { Button } from './Button';
import { Icon } from './Icon';

const hero = require('../../assets/images/hero-welcome.webp');

interface Slide {
  id: string;
  tag: string;
  title: string;
  sub: string;
  cta: string;
  onPress?: () => void;
  image?: any;
  from?: string;
  to?: string;
}

export function HeroCarousel({
  onDeposit,
  onPromos,
}: {
  onDeposit: () => void;
  onPromos: () => void;
}) {
  const { colors, radius } = useTheme();
  const width = Dimensions.get('window').width - 28;
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList<Slide>>(null);

  const slides: Slide[] = [
    { id: 's1', tag: 'Welcome offer', title: '$6000 Free\n+ 200 Kash Spins', sub: 'Join the pride', cta: 'Deposit now', onPress: onDeposit, image: hero },
    { id: 's2', tag: 'Loyalty', title: 'Johnnie Jewels', sub: 'Earn as you play, unlock exclusive rewards', cta: 'View rewards', onPress: onPromos, from: '#2b1703', to: '#140a01' },
  ];

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / (width + 16)));
  };

  return (
    <View>
      <FlatList
        ref={ref}
        horizontal
        pagingEnabled
        data={slides}
        keyExtractor={(s) => s.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width + 16}
        decelerationRate="fast"
        onMomentumScrollEnd={onScroll}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { width, borderRadius: radius.lg + 8, backgroundColor: colors.panel }]}>
            {item.image ? (
              <Image source={item.image} style={styles.img} resizeMode="cover" />
            ) : (
              <LinearGradient colors={[item.from!, item.to!]} style={styles.img} />
            )}
            <LinearGradient
              colors={[colors.panel, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.9, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.copy}>
              <View style={[styles.pill, { backgroundColor: '#262626', borderRadius: radius.md }]}>
                <Icon name="flame" size={16} color={colors.primary} />
                <Text style={[styles.pillText, { color: colors.text }]}>{item.tag}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.sub, { color: '#e8e8e8' }]}>{item.sub}</Text>
                <Button label={item.cta} onPress={item.onPress} style={{ marginTop: 14, alignSelf: 'flex-start' }} />
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.dots}>
        {slides.map((s, i) => (
          <View
            key={s.id}
            style={[
              styles.dot,
              { backgroundColor: i === index ? colors.primary : '#333', width: i === index ? 40 : 22 },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { height: 250, overflow: 'hidden' },
  img: { position: 'absolute', right: 0, top: 0, bottom: 0, width: '72%', height: '100%' },
  copy: { flex: 1, padding: 18, width: '66%' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingVertical: 7, paddingHorizontal: 12 },
  pillText: { fontWeight: '500', fontSize: 14 },
  title: { fontSize: 24, fontWeight: '800', lineHeight: 28 },
  sub: { fontSize: 14, fontWeight: '500', marginTop: 4 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 14, marginBottom: 8 },
  dot: { height: 5, borderRadius: 3 },
});
