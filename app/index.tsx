import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StealthSlider } from '../components/UI/Slider';
import { Controls } from '../components/Controls';
import { colors, spacing, padding } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useSessionStore } from '../store/useSessionStore';

export default function HomeScreen() {
  const { roundLength, restLength, numRounds, setRoundLength, setRestLength, setNumRounds } =
    useSessionStore();
  const router = useRouter();

  const formatRest = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs === 0 ? `${mins} minute${mins !== 1 ? 's' : ''}` : `${mins}m ${secs}s`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsIcon} onPress={() => router.push('/settings')}>
          <Ionicons name="menu" size={spacing.xxl} color={colors.timerText} />
        </TouchableOpacity>

        <View>
          <View style={styles.logoArea}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

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
            label="Rest"
            value={restLength}
            min={0}
            max={180}
            step={10}
            displayValue={restLength === 0 ? 'No Rest' : formatRest(restLength)}
            onChange={setRestLength}
          />
          <StealthSlider
            label="Rounds"
            value={numRounds}
            min={1}
            max={10}
            step={1}
            displayValue={`${numRounds} round${numRounds !== 1 ? 's' : ''}`}
            onChange={setNumRounds}
          />
        </View>

        <Controls onStop={() => {}} onStart={() => router.push({ pathname: '/countdown' })} />
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
  sliders: {
    width: '100%',
    gap: spacing.md,
  },
  logo: {
    width: 200,
    height: 55,
  },
  settingsIcon: {
    position: 'absolute',
    top: spacing.sm,
    right: 5,
  },
});
