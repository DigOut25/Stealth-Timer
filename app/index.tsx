import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StealthSlider } from '../components/Slider';
import { theme } from '../constants/theme';

export default function SettingsScreen() {
  const [roundLength, setRoundLength] = useState(5);
  const [numRounds, setNumRounds] = useState(3);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <Text style={styles.logoText}>STEALTH</Text>
          <Text style={styles.logoSub}>BJJ</Text>
        </View>

        {/* Timer display (static on settings screen) */}
        <Text style={styles.timerDisplay}>0:00</Text>

        {/* Sliders */}
        <View style={styles.sliders}>
          <StealthSlider
            label="Round Length"
            value={roundLength}
            min={1}
            max={15}
            step={1}
            displayValue={`${roundLength} minute${roundLength !== 1 ? 's' : ''}`}
            onChange={setRoundLength}
          />
          <StealthSlider
            label="Number Of Rounds"
            value={numRounds}
            min={1}
            max={10}
            step={1}
            displayValue={`${numRounds} round${numRounds !== 1 ? 's' : ''}`}
            onChange={setNumRounds}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.btn, styles.btnStop]}>
            <Text style={styles.btnText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnStart]}
            onPress={() => router.push({ pathname: '/countdown', params: { roundLength, numRounds } })}
          >
            <Text style={styles.btnText}>Start</Text>
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
    color: theme.colors.textDark,
    letterSpacing: 8,
  },
  logoSub: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textDark,
    letterSpacing: 6,
    marginTop: -4,
  },
  timerDisplay: {
    fontSize: 96,
    fontWeight: '200',
    color: theme.colors.timerText,
    letterSpacing: -2,
  },
  sliders: {
    width: '100%',
    gap: theme.spacing.md,
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
  btnStop: {
    backgroundColor: theme.colors.buttonStop,
  },
  btnStart: {
    backgroundColor: theme.colors.buttonStart,
  },
  btnText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});