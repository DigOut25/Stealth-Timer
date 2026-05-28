import { View, StyleSheet } from 'react-native';
import { Button } from './UI/Button';
import { spacing } from '../constants/theme';

type Props = {
  onStop: () => void;
  onStart: () => void;
  startLabel?: string;
};

export function Controls({ onStop, onStart, startLabel = 'Start' }: Props) {
  return (
    <View style={styles.row}>
      <Button label="Stop" variant="stop" onPress={onStop} />
      <Button label={startLabel} variant="start" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    paddingHorizontal: spacing.xs,
  },
});