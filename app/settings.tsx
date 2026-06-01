import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, padding, fonts } from '../constants/theme';
import { useSettingsStore, SoundOption } from '../store/useSettingsStore';
import Constants from 'expo-constants';
import { Card } from '../components/UI/Card';
import { SectionHeader } from '../components/UI/SectionHeader';
import { ListItem } from '../components/UI/ListItem';
import { Toggle } from '../components/UI/Toggle';
import { ScreenWrapper } from '../components/ScreenWrapper';

function getSoundLabel(sound: SoundOption): string {
  if (sound.type === 'custom') return sound.label;
  return sound.name.charAt(0).toUpperCase() + sound.name.slice(1);
}

export default function SettingsScreen() {
  const router = useRouter();
  const {
    roundEndSound,
    restEndSound,
    hapticsEnabled,
    keepAwake,
    setHapticsEnabled,
    setKeepAwake,
  } = useSettingsStore();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        <SectionHeader title="Sound" />
        <Card>
          <ListItem
            label="Round End Sound"
            value={getSoundLabel(roundEndSound)}
            onPress={() => router.push({ pathname: '/soundPicker', params: { type: 'roundEnd' } })}
            showDivider
          />
          <ListItem
            label="Rest End Sound"
            value={getSoundLabel(restEndSound)}
            onPress={() => router.push({ pathname: '/soundPicker', params: { type: 'restEnd' } })}
          />
        </Card>

        <SectionHeader title="Session" />
        <Card>
          <Toggle
            label="Haptic Feedback"
            value={hapticsEnabled}
            onValueChange={setHapticsEnabled}
            showDivider
          />
          <Toggle label="Keep Awake" value={keepAwake} onValueChange={setKeepAwake} />
        </Card>

        <SectionHeader title="About" />
        <Card>
          <ListItem
            label="Version"
            value={Constants.expoConfig?.version ?? '1.0.0'}
            showChevron={false}
          />
        </Card>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding.screen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  title: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.xl,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wide,
  },
});
