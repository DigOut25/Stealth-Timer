import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Controls } from '../components/Controls';
import { colors, spacing, padding, fonts } from '../constants/theme';
import { TimerDisplay } from '../components/Timer';
import { useTimer } from '../hooks/useTimer';
import { useSessionStore } from '../store/useSessionStore';
import { useKeepAwake } from '../hooks/useKeepAwake';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Logo } from '../components/Logo';

export default function CountdownScreen() {
  const { roundLength, numRounds, restLength } = useSessionStore();
  useKeepAwake();
  const router = useRouter();

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
      <View style={styles.container}>
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
  finishedText: {
    color: colors.text,
    fontFamily: fonts.family.display,
    fontSize: fonts.size.xxl,
    letterSpacing: fonts.letterSpacing.wide,
  },
});
