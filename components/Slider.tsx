import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../constants/theme';

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (val: number) => void;
};

export function StealthSlider({ label, value, min, max, step, displayValue, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={theme.colors.accent}
        maximumTrackTintColor="rgba(255,255,255,0.3)"
        thumbTintColor="#FFFFFF"
      />
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  slider: {
    width: '85%',
    height: 40,
  },
  value: {
    color: theme.colors.text,
    fontSize: 15,
    marginTop: 2,
    opacity: 0.85,
  },
});