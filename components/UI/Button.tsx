import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { radius, colors, padding } from '@/constants';
import { useHaptics } from '@/hooks';
import * as Haptics from 'expo-haptics';

type Variant = 'start' | 'stop' | 'pause';

type Props = {
  label: string;
  variant: Variant;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({ label, variant, onPress, disabled }: Props) {
  const { impact } = useHaptics();
  const handlePress = async () => {
    await impact(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };
  return (
    <TouchableOpacity
      style={[styles.btn, styles[variant], disabled && styles.disabled]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    paddingVertical: padding.button,
    borderRadius: radius.button,
    alignItems: 'center',
  },
  start: {
    backgroundColor: colors.buttonStart,
  },
  stop: {
    backgroundColor: colors.buttonStop,
  },
  pause: { backgroundColor: colors.buttonPause },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
