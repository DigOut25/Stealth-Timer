import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Controls } from '../components/Controls';
import { colors, spacing, padding, fonts } from '../constants/theme';
import { TimerDisplay } from '../components/Timer';
import { useTimer } from '../hooks/useTimer';
import { useSessionStore } from '../store/useSessionStore';
import { useKeepAwake } from '../hooks/useKeepAwake';

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
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: padding.screen,
  },
  logoArea: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  finishedText: {
    color: colors.text,
    fontFamily: fonts.family.display,
    fontSize: fonts.size.xxl,
    letterSpacing: fonts.letterSpacing.wide,
  },
  logo: {
    width: 220,
    height: 55,
  },
});
