import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from './Icon';

interface ToastState {
  message: string;
  icon?: IconName;
}

interface ToastContextValue {
  toast: (message: string, icon?: IconName) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { colors, radius } = useTheme();
  const [state, setState] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((message: string, icon: IconName = 'check') => {
    setState({ message, icon });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {state && (
        <Animated.View
          entering={FadeInDown.springify().damping(16)}
          exiting={FadeOutDown.duration(180)}
          style={[
            styles.toast,
            { backgroundColor: colors.panel2, borderColor: colors.primary, borderRadius: radius.pill },
          ]}
          pointerEvents="none"
        >
          {state.icon && <Icon name={state.icon} size={16} color={colors.primary} />}
          <Text style={[styles.text, { color: colors.text }]}>{state.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 96,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    zIndex: 100,
  },
  text: { fontWeight: '700', fontSize: 13 },
});
