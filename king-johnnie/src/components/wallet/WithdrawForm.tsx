import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { MethodList } from './MethodList';
import { WITHDRAW_METHODS } from '@/data/methods';
import { services } from '@/services';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/components/Toast';
import { ACCOUNT_MOCK } from '@/data/account';

export function WithdrawForm({ onDone }: { onDone?: () => void }) {
  const { colors, radius } = useTheme();
  const { user, setBalance } = useAuth();
  const { toast } = useToast();
  const [method, setMethod] = useState('bank');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const kycOk = (user?.kyc ?? ACCOUNT_MOCK.kyc) === 'verified';
  const amt = Number(amount) || 0;
  const m = WITHDRAW_METHODS.find((x) => x.id === method)!;

  const submit = async () => {
    if (!kycOk) {
      toast('Verify your account to withdraw', 'shield');
      return;
    }
    if (amt < m.min) {
      toast(`Minimum withdrawal is $${m.min}`, 'close');
      return;
    }
    setLoading(true);
    try {
      const res = await services.wallet.withdraw({ method, amount: amt, details: {} });
      if (res.ok) {
        if (res.newBalance != null) setBalance(res.newBalance);
        toast(`Withdrawal of $${amt.toFixed(2)} requested`, 'check');
        setAmount('');
        onDone?.();
      } else {
        toast(res.message ?? 'Withdrawal failed', 'close');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: 14 }}>
      {!kycOk && (
        <View style={[styles.warn, { borderRadius: radius.lg }]}>
          <Icon name="shield" size={18} color={colors.danger} />
          <Text style={{ color: '#ffb3b3', fontSize: 12, flex: 1 }}>
            Your account must be verified before you can withdraw. Head to Account → Verification.
          </Text>
        </View>
      )}
      <Text style={[styles.label, { color: colors.muted }]}>Withdraw to</Text>
      <MethodList methods={WITHDRAW_METHODS} selected={method} onSelect={setMethod} />

      <Text style={[styles.label, { color: colors.muted }]}>Amount</Text>
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
      <Text style={{ color: colors.faint, fontSize: 12 }}>
        Available: ${(user?.cash ?? 0).toFixed(2)} · {m.eta}
      </Text>

      <Button label={`Withdraw $${amt.toFixed(2)}`} block loading={loading} onPress={submit} disabled={!kycOk} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600' },
  warn: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,93,93,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,93,93,0.35)',
  },
  amountBox: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 60, paddingHorizontal: 16, borderWidth: 1.5 },
  currency: { fontSize: 20, fontWeight: '800' },
  amountInput: { flex: 1, fontSize: 26, fontWeight: '800' },
});
