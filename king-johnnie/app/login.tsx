import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';

const logo = require('../assets/images/logo.png');

export default function LoginModal() {
  const { colors, radius } = useTheme();
  const { login } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async () => {
    if (!username || !password) {
      setErr('Enter your username and password');
      return;
    }
    setErr('');
    setLoading(true);
    try {
      await login({ username, password });
      toast(`Welcome back, ${username}`, 'crown');
      router.back();
    } catch (e: any) {
      setErr(e?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
      <View style={[styles.modal, { backgroundColor: colors.panel, borderRadius: radius.lg + 8 }]}>
        <Pressable onPress={() => router.back()} style={[styles.close, { backgroundColor: colors.panel2 }]} hitSlop={8}>
          <Icon name="close" size={18} color={colors.text} />
        </Pressable>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
        <Text style={[styles.sub, { color: colors.muted }]}>Log in to play and claim your rewards</Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.muted }]}>Username or email</Text>
          <View style={[styles.inputWrap, { backgroundColor: colors.field, borderColor: colors.border, borderRadius: radius.lg }]}>
            <Icon name="user" size={18} color={colors.faint} />
            <TextInput
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="kingjohnnie"
              placeholderTextColor={colors.faint}
              style={[styles.input, { color: colors.text }]}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.muted }]}>Password</Text>
          <View style={[styles.inputWrap, { backgroundColor: colors.field, borderColor: colors.border, borderRadius: radius.lg }]}>
            <Icon name="lock" size={18} color={colors.faint} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!show}
              placeholder="••••••••"
              placeholderTextColor={colors.faint}
              style={[styles.input, { color: colors.text }]}
            />
            <Pressable onPress={() => setShow((s) => !s)} hitSlop={8}>
              <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 13 }}>{show ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>
        </View>

        {err ? <Text style={[styles.err, { color: colors.danger }]}>{err}</Text> : null}

        <Button label="Login" block loading={loading} onPress={submit} style={{ marginTop: 6 }} />

        <Text style={[styles.alt, { color: colors.muted }]}>
          New to King Johnnie?{' '}
          <Text onPress={() => router.replace('/signup')} style={{ color: colors.primary, fontWeight: '700' }}>
            Create account
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  modal: { width: '100%', maxWidth: 460, padding: 28 },
  close: { position: 'absolute', top: 14, right: 14, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  logo: { height: 44, width: 150, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800' },
  sub: { marginTop: 4, marginBottom: 20 },
  field: { marginBottom: 14, gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 50, paddingHorizontal: 14, borderWidth: 1.5 },
  input: { flex: 1, fontSize: 15 },
  err: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  alt: { textAlign: 'center', marginTop: 16, fontSize: 14 },
});
