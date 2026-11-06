import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { MethodList } from './MethodList';
import { DEPOSIT_METHODS } from '@/data/methods';
import { services } from '@/services';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';

const QUICK = [50, 100, 250, 500, 1000];

export function DepositForm({ onDone }: { onDone?: () => void }) {
  const { colors, radius } = useTheme();
  const { user, setBalance } = useAuth();
  const { toast } = useToast();
  const [method, setMethod] = useState('payid');
  const [amount, setAmount] = useState('100');
  const [bonus, setBonus] = useState(true);
  const [loading, setLoading] = useState(false);

  const amt = Number(amount) || 0;
  const m = DEPOSIT_METHODS.find((x) => x.id === method)!;
  const valid = amt >= m.min && amt <= m.max;

  const submit = async () => {
    if (!valid) {
      toast(`Enter between $${m.min} and $${m.max}`, 'close');
      return;
    }
    setLoading(true);
    try {
      const res = await services.wallet.deposit({ method, amount: amt, bonusCode: bonus ? 'WELCOME' : undefined });
      if (res.ok) {
        if (res.newBalance != null) setBalance(res.newBalance);
        toast(`Deposited $${amt.toFixed(2)}`, 'check');
        onDone?.();
      } else {
        toast(res.message ?? 'Deposit failed', 'close');
      }
    } catch (e: any) {
      toast(e?.message ?? 'Deposit failed', 'close');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: 14 }}>
      <Text style={[styles.label, { color: colors.muted }]}>Payment method</Text>
      <MethodList methods={DEPOSIT_METHODS} selected={method} onSelect={setMethod} />

      <Text style={[styles.label, { color: colors.muted }]}>Amount ({user?.currency ?? 'AUD'})</Text>
      <View style={[styles.amountBox, { backgroundColor: colors.field, borderColor: colors.border, borderRadius: radius.lg }]}>
        <Text style={[styles.currency, { color: colors.faint }]}>$</Text>
        <TextInput
          value={amount}
          onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
          style={[styles.amountInput, { color: colors.text }]}
          placeholder="0"
          placeholderTextColor={colors.faint}
        />
      </View>
      <View style={styles.chips}>
        {QUICK.map((q) => (
          <Pressable
            key={q}
            onPress={() => setAmount(String(q))}
            style={[
              styles.chip,
              { backgroundColor: colors.panel2, borderRadius: radius.md },
              amt === q && { backgroundColor: colors.primarySoft, borderColor: colors.primary, borderWidth: 1.5 },
            ]}
          >
            <Text style={{ color: amt === q ? colors.primary : colors.text, fontWeight: '700' }}>${q}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => setBonus((b) => !b)}
        style={[styles.bonus, { backgroundColor: colors.panel2, borderRadius: radius.lg }]}
      >
        <View style={[styles.bonusIco, { backgroundColor: colors.primarySoft }]}>
          <Icon name="gift" size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontWeight: '700' }}>Claim welcome bonus</Text>
          <Text style={{ color: colors.faint, fontSize: 12 }}>100% up to $1000 + 100 Kash Spins</Text>
        </View>
        <View style={[styles.check, { borderColor: bonus ? colors.primary : colors.faint, backgroundColor: bonus ? colors.primary : 'transparent' }]}>
          {bonus && <Icon name="check" size={14} color="#fff" />}
        </View>
      </Pressable>

      <View style={[styles.summary, { backgroundColor: colors.panel2, borderRadius: radius.lg }]}>
        <Row label="Deposit" value={`$${amt.toFixed(2)}`} colors={colors} />
        <Row label="Bonus" value={bonus ? `$${Math.min(amt, 1000).toFixed(2)}` : '$0.00'} colors={colors} />
        <Row label="Total to play" value={`$${(amt + (bonus ? Math.min(amt, 1000) : 0)).toFixed(2)}`} colors={colors} total />
      </View>

      <Button label={`Deposit $${amt.toFixed(2)}`} block loading={loading} onPress={submit} />
      <View style={styles.secure}>
        <Icon name="lock" size={14} color={colors.faint} />
        <Text style={{ color: colors.faint, fontSize: 12 }}>Secured with 256-bit SSL encryption</Text>
      </View>
    </View>
  );
}

function Row({ label, value, colors, total }: { label: string; value: string; colors: any; total?: boolean }) {
  return (
    <View style={[styles.sumRow, total && { borderTopWidth: 1, borderTopColor: colors.borderStrong, paddingTop: 8, marginTop: 2 }]}>
      <Text style={{ color: colors.muted }}>{label}</Text>
      <Text style={{ color: colors.text, fontWeight: '700' }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600' },
  amountBox: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 60, paddingHorizontal: 16, borderWidth: 1.5 },
  currency: { fontSize: 20, fontWeight: '800' },
  amountInput: { flex: 1, fontSize: 26, fontWeight: '800' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { height: 38, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  bonus: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  bonusIco: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  check: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  summary: { padding: 14, gap: 6 },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between' },
  secure: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' },
});
