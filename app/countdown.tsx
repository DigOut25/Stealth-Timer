import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controls } from '../components/Controls';
import { colors, spacing, padding, fonts } from '../constants/theme';
import { TimerDisplay } from '../components/Timer';
import { useTimer } from '../hooks/useTimer';

export default function CountdownScreen() {
  const { roundLength, numRounds } = useLocalSearchParams<{
    roundLength: string;
    numRounds: string;
  }>();
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
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <TimerDisplay secondsLeft={secondsLeft} currentRound={currentRound} totalRounds={rounds} />

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
    paddingVertical: spacing.lg,
    paddingHorizontal: padding.screen,
  },
  logoArea: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  logoText: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.logo,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.widest,
  },
  logoSub: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.lg,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wider,
    marginTop: -4,
  },
  finishedText: {
    color: colors.text,
    fontFamily: fonts.family.display,
    fontSize: fonts.size.xxl,
    letterSpacing: fonts.letterSpacing.wide,
  },
  logo: {
    width: 300,
    height: 200,
  },
});
