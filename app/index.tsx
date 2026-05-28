import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StealthSlider } from '../components/UI/Slider';
import { Controls } from '../components/Controls';
import { colors, spacing, padding, fonts } from '../constants/theme';
import { TimerDisplay } from '../components/Timer';

export default function SettingsScreen() {
  const [roundLength, setRoundLength] = useState(5);
  const [numRounds, setNumRounds] = useState(3);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <TimerDisplay secondsLeft={0} currentRound={1} totalRounds={numRounds} showRound={false} />

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

        <Controls
          onStop={() => {}}
          onStart={() =>
            router.push({ pathname: '/countdown', params: { roundLength, numRounds } })
          }
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
  sliders: {
    width: '100%',
    gap: spacing.md,
  },
  logo: {
    width: 300,
    height: 200,
  },
});
