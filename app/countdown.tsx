import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controls } from '../components/Controls';
import { theme } from '../constants/theme';
import { TimerDisplay } from '../components/Timer';
import { useTimer } from '../hooks/useTimer';

export default function CountdownScreen() {
  const { roundLength, numRounds } = useLocalSearchParams<{ roundLength: string; numRounds: string }>();
  const router = useRouter();

  const totalSeconds = parseInt(roundLength) * 60;
  const rounds = parseInt(numRounds);

  const { secondsLeft, currentRound, running, finished, setRunning } = useTimer({
    totalSeconds,
    totalRounds: rounds,
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.logoArea}>
          <Text style={styles.logoText}>STEALTH</Text>
          <Text style={styles.logoSub}>BJJ</Text>
        </View>

        <TimerDisplay
          secondsLeft={secondsLeft}
          currentRound={currentRound}
          totalRounds={rounds}
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
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  logoArea: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 8,
  },
  logoSub: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 6,
    marginTop: -4,
  },
  finishedText: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 1,
  },
});