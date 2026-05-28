import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../constants/theme';

export default function CountdownScreen() {
  const { roundLength, numRounds } = useLocalSearchParams<{ roundLength: string; numRounds: string }>();
  const router = useRouter();

  const totalSeconds = parseInt(roundLength) * 60;
  const rounds = parseInt(numRounds);

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [currentRound, setCurrentRound] = useState(1);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (currentRound < rounds) {
              setCurrentRound(r => r + 1);
              return totalSeconds;
            } else {
              setRunning(false);
              clearInterval(intervalRef.current!);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, currentRound]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.logoArea}>
          <Text style={styles.logoText}>STEALTH</Text>
          <Text style={styles.logoSub}>BJJ</Text>
        </View>

        <View style={styles.timerArea}>
          <Text style={styles.roundLabel}>Round {currentRound} of {rounds}</Text>
          <Text style={styles.timerDisplay}>{display}</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.btn, styles.btnStop]} onPress={() => router.back()}>
            <Text style={styles.btnText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnStart]}
            onPress={() => setRunning(r => !r)}
          >
            <Text style={styles.btnText}>{running ? 'Pause' : 'Resume'}</Text>
          </TouchableOpacity>
        </View>

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
    color: 'rgba(0,0,0,0.25)',
    letterSpacing: 8,
  },
  logoSub: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.25)',
    letterSpacing: 6,
    marginTop: -4,
  },
  timerArea: {
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
  timerDisplay: {
    fontSize: 96,
    fontWeight: '200',
    color: theme.colors.timerText,
    letterSpacing: -2,
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    width: '100%',
    paddingHorizontal: theme.spacing.xs,
  },
  btn: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: theme.radius.button,
    alignItems: 'center',
  },
  btnStop: { backgroundColor: theme.colors.buttonStop },
  btnStart: { backgroundColor: theme.colors.buttonStart },
  btnText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});