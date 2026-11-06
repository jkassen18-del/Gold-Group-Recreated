import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from '@/components/Icon';
import { INFO_PAGES, sectionBody } from '@/data/infoPages';

export default function InfoScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { colors, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const page = INFO_PAGES[String(slug)];

  if (!page) {
    return (
      <View style={[styles.wrap, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}>
        <Text style={{ color: colors.text, padding: 20 }}>Page not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}>
      <View style={styles.head}>
        <Pressable onPress={() => router.back()} style={[styles.back, { backgroundColor: colors.panel2 }]} hitSlop={8}>
          <Icon name="chevL" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {page.title}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.doc, { backgroundColor: colors.panel, borderRadius: radius.lg + 4 }]}>
          <Text style={[styles.meta, { color: colors.faint }]}>{page.updated} · King Johnnie</Text>
          {page.slug === 'responsible' && (
            <View style={[styles.callout, { backgroundColor: colors.primarySoft, borderLeftColor: colors.primary }]}>
              <Icon name="shield" size={18} color={colors.primary} />
              <Text style={{ color: colors.text, fontSize: 14, flex: 1 }}>
                Need to take a break? You can set deposit limits or self-exclude any time from Account → Responsible gaming.
              </Text>
            </View>
          )}
          {page.sections.map((s, i) => (
            <View key={i}>
              <Text style={[styles.h2, { color: colors.text }]}>{s}</Text>
              <Text style={[styles.p, { color: '#d6d6d6' }]}>{sectionBody(page.slug, s)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingBottom: 8 },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '800', flex: 1 },
  content: { padding: 14, paddingBottom: 40 },
  doc: { padding: 24 },
  meta: { fontSize: 13, marginBottom: 18 },
  callout: { flexDirection: 'row', gap: 12, padding: 14, borderLeftWidth: 3, borderRadius: 8, marginBottom: 18 },
  h2: { fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  p: { lineHeight: 24, marginBottom: 4 },
});
