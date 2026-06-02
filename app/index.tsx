import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { colors, spacing, padding } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useSessionStore } from '@/store';
import { StealthSlider } from '../components/UI';
import { Controls, Logo, ScreenWrapper } from '@/components';

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
    <ScreenWrapper>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsIcon} onPress={() => router.push('/settings')}>
          <Ionicons name="menu" size={spacing.xxl} color={colors.timerText} />
        </TouchableOpacity>

        <Logo />

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
  sliders: {
    width: '100%',
    gap: spacing.md,
  },
  settingsIcon: {
    position: 'absolute',
    right: 5,
  },
});
