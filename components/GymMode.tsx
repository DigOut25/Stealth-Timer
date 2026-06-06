import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '@/constants';

type Props = {
  secondsLeft: number;
  currentRound: number;
  totalRounds: number;
  isResting: boolean;
  running: boolean;
  finished: boolean;
  onClose: () => void;
  onTogglePause: () => void;
};

export function GymMode({
  secondsLeft,
  currentRound,
  totalRounds,
  isResting,
  running,
  finished,
  onClose,
  onTogglePause,
}: Props) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <TouchableOpacity style={styles.container} onPress={onTogglePause} activeOpacity={1}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={onClose}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Ionicons name="close" size={56} color={colors.textMuted} />
      </TouchableOpacity>

      <Text style={styles.roundLabel}>
        {finished
          ? 'Session Complete'
          : isResting
            ? 'Rest'
            : `Round ${currentRound} of ${totalRounds}`}
      </Text>

      <Text style={[styles.timer, isResting && styles.timerRest]}>{display}</Text>

      <Text style={styles.hint}>{finished ? '' : running ? 'Tap to pause' : 'Tap to resume'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...require('react-native').StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  closeBtn: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  roundLabel: {
    fontFamily: fonts.family.display,
    fontSize: 48,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wider,
    opacity: 0.7,
    marginBottom: spacing.lg,
  },
  timer: {
    fontFamily: fonts.family.display,
    fontSize: 200,
    color: colors.text,
    letterSpacing: -4,
  },
  timerRest: {
    color: colors.accent,
  },
  hint: {
    fontFamily: fonts.family.display,
    fontSize: 20,
    color: colors.textMuted,
    marginTop: spacing.xl,
    letterSpacing: fonts.letterSpacing.wide,
  },
});
