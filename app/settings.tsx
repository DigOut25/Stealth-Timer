import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, padding, fonts } from '../constants/theme';
import { useSettingsStore, SoundOption } from '../store/useSettingsStore';

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
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                router.push({ pathname: '/soundPicker', params: { type: 'roundEnd' } })
              }
            >
              <Text style={styles.rowLabel}>Round End Sound</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowValue}>{getSoundLabel(roundEndSound)}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push({ pathname: '/soundPicker', params: { type: 'restEnd' } })}
            >
              <Text style={styles.rowLabel}>Rest End Sound</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowValue}>{getSoundLabel(restEndSound)}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Haptic Feedback</Text>
              <Switch
                value={hapticsEnabled}
                onValueChange={setHapticsEnabled}
                trackColor={{ false: colors.surface, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Keep Awake</Text>
              <Switch
                value={keepAwake}
                onValueChange={setKeepAwake}
                trackColor={{ false: colors.surface, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Version</Text>
              <Text style={styles.rowValue}>1.0.0</Text>
            </View>
          </View>
        </View>
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
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.sm,
    color: colors.textMuted,
    letterSpacing: fonts.letterSpacing.wider,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  rowLabel: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.normal,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rowValue: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    marginHorizontal: padding.card,
  },
});
