import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, padding, fonts } from '@/constants';
import { ScreenWrapper, TimerDisplay, Controls, Logo } from '@/components';
import { useKeepAwake, useTimer } from '@/hooks';
import { useSessionStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';

export default function CountdownScreen() {
  const { roundLength, numRounds, restLength } = useSessionStore();
  useKeepAwake();
  const router = useRouter();
  const [gymMode, setGymMode] = useState(false);

  const totalSeconds = roundLength * 60;
  const rounds = numRounds;
  const restSeconds = restLength;

  const { secondsLeft, currentRound, isResting, running, finished, setRunning } = useTimer({
    totalSeconds,
    totalRounds: rounds,
    restSeconds,
  });

  return (
    <ScreenWrapper>
      {gymMode ? (
        <TouchableOpacity
          style={styles.gymModeContainer}
          onPress={() => setRunning(r => !r)}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setGymMode(false)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="close" size={50} color={colors.textMuted} />
          </TouchableOpacity>

          <Text style={styles.roundLabel}>
            {finished
              ? 'Session Complete'
              : isResting
                ? 'Rest'
                : `Round ${currentRound} of ${rounds}`}
          </Text>

          <Text style={[styles.timer, isResting && styles.timerRest]}>
            {`${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`}
          </Text>

          <Text style={styles.hint}>
            {finished ? '' : running ? 'Tap to pause' : 'Tap to resume'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          {/* TV icon positioned absolutely */}
          <TouchableOpacity style={styles.gymModeBtn} onPress={() => setGymMode(true)}>
            <Ionicons name="tv-outline" size={36} color={colors.textMuted} />
          </TouchableOpacity>

          <Logo />

          <TimerDisplay
            secondsLeft={secondsLeft}
            currentRound={currentRound}
            totalRounds={rounds}
            isResting={isResting}
          />

          {finished && <Text style={styles.finishedText}>Session Complete!</Text>}

          <Controls
            onStop={() => router.back()}
            onStart={() => setRunning(r => !r)}
            startLabel={finished ? 'Done' : running ? 'Pause' : 'Resume'}
          />
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: padding.screen,
  },
  gymModeContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  roundLabel: {
    fontFamily: fonts.family.display,
    fontSize: 48,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wider,
    opacity: 0.7,
    marginBottom: spacing.lg,
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
  finishedText: {
    color: colors.text,
    fontFamily: fonts.family.display,
    fontSize: fonts.size.xxl,
    letterSpacing: fonts.letterSpacing.wide,
  },
  gymModeBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: padding.screen,
    zIndex: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  timer: {
    fontFamily: fonts.family.display,
    fontSize: 200,
    color: colors.text,
    letterSpacing: -4,
  },
});
