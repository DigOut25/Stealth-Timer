import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

type Variant = 'start' | 'stop';

type Props = {
  label: string;
  variant: Variant;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({ label, variant, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: theme.radius.button,
    alignItems: 'center',
  },
  start: {
    backgroundColor: theme.colors.buttonStart,
  },
  stop: {
    backgroundColor: theme.colors.buttonStop,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});