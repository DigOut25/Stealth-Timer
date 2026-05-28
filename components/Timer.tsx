import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../constants/theme';

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
    fontFamily: fonts.family.display,
    color: colors.text,
    fontSize: fonts.size.lg,
    opacity: 0.7,
    marginBottom: spacing.sm,
    letterSpacing: fonts.letterSpacing.wide,
  },
  timer: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.timer,
    color: colors.timerText,
    letterSpacing: fonts.letterSpacing.tight,
  },
});