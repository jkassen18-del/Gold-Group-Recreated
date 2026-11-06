import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';
import { services } from '@/services';
import { COUNTRIES } from '@/data/catalog';

const logo = require('../assets/images/logo.png');

export default function SignupModal() {
  const { colors, radius } = useTheme();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [terms, setTerms] = useState(false);
  const [err, setErr] = useState('');
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(false);

  const next = async () => {
    setErr('');
    if (!username || username.length < 3) return setErr('Username must be at least 3 characters');
    if (!email.includes('@')) return setErr('Enter a valid email');
    if (password.length < 6) return setErr('Password must be at least 6 characters');
    setChecking(true);
    try {
      if (await services.auth.isUsernameTaken(username)) {
        setErr('That username is taken');
        return;
      }
      setStep(1);
    } finally {
      setChecking(false);
    }
  };

  const submit = async () => {
    setErr('');
    if (!terms) return setErr('Please accept the Terms & Conditions');
    setLoading(true);
    try {
      await signup({ username, email, password, country: country[0], dialCode: country[1], phone, acceptedTerms: terms });
      toast('Account created — welcome to the pride!', 'crown');
      router.back();
    } catch (e: any) {
      setErr(e?.message ?? 'Sign up failed');
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
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.title, { color: colors.text }]}>Join the pride</Text>
          <Text style={[styles.sub, { color: colors.muted }]}>$6000 welcome package + 200 Kash Spins</Text>

          <View style={styles.steps}>
            {[0, 1].map((i) => (
              <View key={i} style={[styles.stepBar, { backgroundColor: i <= step ? colors.primary : '#333' }]} />
            ))}
          </View>

          {step === 0 ? (
            <>
              <Field label="Username" icon="user" value={username} onChange={setUsername} placeholder="kingjohnnie" autoCapitalize="none" colors={colors} radius={radius} />
              <Field label="Email" icon="mail" value={email} onChange={setEmail} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" colors={colors} radius={radius} />
              <Field label="Password" icon="lock" value={password} onChange={setPassword} placeholder="At least 6 characters" secure colors={colors} radius={radius} />
              {err ? <Text style={[styles.err, { color: colors.danger }]}>{err}</Text> : null}
              <Button label="Continue" block loading={checking} onPress={next} style={{ marginTop: 6 }} />
            </>
          ) : (
            <>
              <Text style={[styles.label, { color: colors.muted }]}>Country</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }} contentContainerStyle={{ gap: 8 }}>
                {COUNTRIES.map((c) => {
                  const on = c[0] === country[0];
                  return (
                    <Pressable key={c[0]} onPress={() => setCountry(c)} style={[styles.chip, { backgroundColor: on ? colors.primarySoft : colors.panel2, borderRadius: radius.md, borderColor: on ? colors.primary : 'transparent', borderWidth: 1.5 }]}>
                      <Text style={{ color: on ? colors.primary : colors.text, fontWeight: '700', fontSize: 13 }}>{c[2]}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
              <Text style={[styles.label, { color: colors.muted }]}>Phone</Text>
              <View style={styles.phoneRow}>
                <View style={[styles.dial, { backgroundColor: colors.field, borderColor: colors.border, borderRadius: radius.lg }]}>
                  <Text style={{ color: colors.text, fontWeight: '700' }}>{country[1]}</Text>
                </View>
                <View style={[styles.inputWrap, { backgroundColor: colors.field, borderColor: colors.border, borderRadius: radius.lg, flex: 1 }]}>
                  <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="412 345 678" placeholderTextColor={colors.faint} style={[styles.input, { color: colors.text }]} />
                </View>
              </View>

              <Pressable onPress={() => setTerms((t) => !t)} style={styles.check}>
                <View style={[styles.box, { borderColor: terms ? colors.primary : colors.faint, backgroundColor: terms ? colors.primary : 'transparent' }]}>
                  {terms && <Icon name="check" size={14} color="#fff" />}
                </View>
                <Text style={{ color: colors.muted, fontSize: 13, flex: 1 }}>
                  I am 18+ and accept the Terms & Conditions and Privacy Policy.
                </Text>
              </Pressable>

              {err ? <Text style={[styles.err, { color: colors.danger }]}>{err}</Text> : null}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button label="Back" variant="dark" onPress={() => setStep(0)} style={{ flex: 1 }} />
                <Button label="Create account" loading={loading} onPress={submit} style={{ flex: 2 }} />
              </View>
            </>
          )}

          <Text style={[styles.alt, { color: colors.muted }]}>
            Already have an account?{' '}
            <Text onPress={() => router.replace('/login')} style={{ color: colors.primary, fontWeight: '700' }}>
              Log in
            </Text>
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({ label, icon, value, onChange, placeholder, secure, autoCapitalize, keyboardType, colors, radius }: any) {
  return (
    <View style={{ marginBottom: 14, gap: 6 }}>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
      <View style={[styles.inputWrap, { backgroundColor: colors.field, borderColor: colors.border, borderRadius: radius.lg }]}>
        <Icon name={icon} size={18} color={colors.faint} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.faint}
          secureTextEntry={secure}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          style={[styles.input, { color: colors.text }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  modal: { width: '100%', maxWidth: 460, maxHeight: '92%', padding: 28 },
  close: { position: 'absolute', top: 14, right: 14, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  logo: { height: 44, width: 150, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800' },
  sub: { marginTop: 4, marginBottom: 18 },
  steps: { flexDirection: 'row', gap: 6, marginBottom: 18 },
  stepBar: { flex: 1, height: 4, borderRadius: 2 },
  label: { fontSize: 13, fontWeight: '600' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 50, paddingHorizontal: 14, borderWidth: 1.5 },
  input: { flex: 1, fontSize: 15 },
  phoneRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  dial: { width: 80, height: 50, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  chip: { height: 38, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  check: { flexDirection: 'row', gap: 12, alignItems: 'center', marginVertical: 10 },
  box: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  err: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  alt: { textAlign: 'center', marginTop: 16, fontSize: 14 },
});
