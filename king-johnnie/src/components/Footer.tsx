import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { PayLogo } from './PayLogo';
import { PAY_STRIP } from '@/data/methods';
import { FOOTER_LINKS } from '@/data/infoPages';

export function Footer() {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { borderTopColor: colors.border }]}>
      <View style={styles.pays}>
        {PAY_STRIP.map((p) => (
          <PayLogo key={p} id={p} size="lg" />
        ))}
      </View>
      <View style={styles.links}>
        {FOOTER_LINKS.map((l) => (
          <Text
            key={l.slug}
            onPress={() => router.push(`/info/${l.slug}`)}
            style={[styles.link, { color: colors.faint }]}
          >
            {l.label}
          </Text>
        ))}
        <Text onPress={() => router.push('/contact')} style={[styles.link, { color: colors.faint }]}>
          Contact
        </Text>
      </View>
      <Text style={[styles.small, { color: colors.faint }]}>
        King Johnnie is operated under licence. Play responsibly. 18+ only.{'\n'}Gambling can be addictive. Gamble within your limits.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20, paddingTop: 24, borderTopWidth: 1, gap: 18 },
  pays: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  link: { fontSize: 14 },
  small: { fontSize: 12, textAlign: 'center', lineHeight: 18, paddingBottom: 10 },
});
