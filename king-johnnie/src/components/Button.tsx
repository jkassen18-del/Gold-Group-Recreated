import React from 'react';
import { Pressable, StyleSheet, Text, View, ActivityIndicator, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'dark' | 'outline';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const HEIGHTS: Record<Size, number> = { sm: 38, md: 46, lg: 54 };
const PADS: Record<Size, number> = { sm: 14, md: 22, lg: 32 };
const FONTS: Record<Size, number> = { sm: 13, md: 15, lg: 17 };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  block,
  loading,
  disabled,
  style,
}: ButtonProps) {
  const { colors, radius } = useTheme();
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const press = () => {
    if (disabled || loading) return;
    Haptics.selectionAsync().catch(() => {});
    onPress?.();
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.primary} size="small" />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              size={size === 'sm' ? 16 : 18}
              color={variant === 'primary' ? '#fff' : variant === 'outline' ? colors.primary : colors.text}
            />
          )}
          <Text
            style={[
              styles.label,
              {
                fontSize: FONTS[size],
                color:
                  variant === 'primary' ? '#fff' : variant === 'outline' ? colors.primary : colors.text,
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </>
  );

  const common: ViewStyle = {
    height: HEIGHTS[size],
    paddingHorizontal: PADS[size],
    borderRadius: radius.md,
    opacity: disabled ? 0.45 : 1,
    width: block ? '100%' : undefined,
  };

  return (
    <Animated.View style={[aStyle, block && { width: '100%' }, style]}>
      <Pressable
        onPress={press}
        onPressIn={() => (scale.value = withSpring(0.96, { damping: 15 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 12 }))}
        disabled={disabled || loading}
      >
        {variant === 'primary' ? (
          <LinearGradient
            colors={[colors.primaryLight, colors.primary, colors.primaryDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.base, common, styles.glow, { shadowColor: colors.primary }]}
          >
            {content}
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.base,
              common,
              variant === 'dark' && { backgroundColor: colors.panel2 },
              variant === 'outline' && { borderWidth: 1.5, borderColor: colors.borderStrong },
            ]}
          >
            {content}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  glow: {
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  label: { fontWeight: '700' },
});
