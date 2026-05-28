import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  secondsLeft: number;
  currentRound: number;
  totalRounds: number;
  showRound?: boolean;
};

export function TimerDisplay({ secondsLeft, currentRound, totalRounds, showRound = true }: Props) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <View style={styles.wrapper}>
      {showRound && (
        <Text style={styles.roundLabel}>
          Round {currentRound} of {totalRounds}
        </Text>
      )}
      <Text style={styles.timer}>{display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  roundLabel: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.7,
    marginBottom: theme.spacing.sm,
    letterSpacing: 1,
  },
  timer: {
    fontSize: 96,
    fontWeight: '200',
    color: theme.colors.text,
    letterSpacing: -2,
  },
});