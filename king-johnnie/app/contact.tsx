import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from '@/components/Icon';
import { Button } from '@/components/Button';
import { config } from '@/services';
import { useToast } from '@/components/Toast';

type Channel = 'chat' | 'email' | 'phone';

const CHANNELS: Array<[Channel, IconName, string]> = [
  ['chat', 'chat', 'Live chat'],
  ['email', 'mail', 'Email'],
  ['phone', 'phone', 'Call us'],
];

export default function ContactScreen() {
  const { colors, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const { toast } = useToast();
  const [channel, setChannel] = useState<Channel>('chat');

  const open = () => {
    if (channel === 'chat') {
      if (config.supportChatUrl) Linking.openURL(config.supportChatUrl).catch(() => {});
      else toast('Live chat opens here — set EXPO_PUBLIC_SUPPORT_CHAT_URL', 'chat');
    } else if (channel === 'email') {
      Linking.openURL('mailto:support@kingjohnnie.ai').catch(() => {});
    } else {
      Linking.openURL('tel:+611800000000').catch(() => {});
    }
  };

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}>
      <View style={styles.head}>
        <Pressable onPress={() => router.back()} style={[styles.back, { backgroundColor: colors.panel2 }]} hitSlop={8}>
          <Icon name="chevL" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Contact & support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.lead, { color: colors.muted }]}>
          Our support crew is available 24/7. Choose how you'd like to reach us.
        </Text>

        <View style={styles.channels}>
          {CHANNELS.map(([key, icon, label]) => {
            const on = key === channel;
            return (
              <Pressable
                key={key}
                onPress={() => setChannel(key)}
                style={[
                  styles.channel,
                  { backgroundColor: colors.panel, borderColor: on ? colors.primary : colors.border, borderRadius: radius.lg + 4 },
                ]}
              >
                <Icon name={icon} size={24} color={on ? colors.primary : colors.text} />
                <Text style={{ color: on ? colors.primary : colors.text, fontWeight: '700', fontSize: 14 }}>{label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.panel, { backgroundColor: colors.panel, borderColor: colors.border, borderRadius: radius.lg + 4 }]}>
          <Text style={[styles.panelTitle, { color: colors.primary }]}>
            {channel === 'chat' ? 'Live chat' : channel === 'email' ? 'Email support' : 'Phone support'}
          </Text>
          <Text style={{ color: colors.muted, lineHeight: 22 }}>
            {channel === 'chat'
              ? 'Instant answers from a real person, any time of day. Average wait under 2 minutes.'
              : channel === 'email'
                ? 'Email support@kingjohnnie.ai and we’ll reply within a few hours.'
                : 'Prefer to talk? Call our freephone line and we’ll sort it out.'}
          </Text>
          <Button
            label={channel === 'chat' ? 'Start live chat' : channel === 'email' ? 'Send email' : 'Call now'}
            icon={channel === 'chat' ? 'chat' : channel === 'email' ? 'mail' : 'phone'}
            onPress={open}
            style={{ marginTop: 16, alignSelf: 'flex-start' }}
          />
        </View>

        <Pressable onPress={() => router.push('/info/faq')} style={[styles.faq, { backgroundColor: colors.panel2, borderRadius: radius.lg }]}>
          <Icon name="target" size={20} color={colors.primary} />
          <Text style={{ color: colors.text, fontWeight: '600', flex: 1 }}>Browse the FAQs first — most answers are there.</Text>
          <Icon name="chevR" size={16} color={colors.faint} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingBottom: 8 },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  content: { padding: 14, paddingBottom: 40 },
  lead: { fontSize: 14, lineHeight: 21, marginBottom: 18 },
  channels: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  channel: { flex: 1, height: 88, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', gap: 8 },
  panel: { padding: 24, borderWidth: 1 },
  panelTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  faq: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, marginTop: 16 },
});
