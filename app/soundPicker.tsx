import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, padding, fonts } from '@/constants';
import { useSettingsStore } from '@/store';
import { resolveSound } from '@/hooks';
import { Audio } from 'expo-av';
import { PresetSound, SoundOption } from '@/types/sounds';
import { ScreenHeader } from '@/components/UI';

const PRESET_SOUNDS: { name: PresetSound; label: string }[] = [
  { name: 'bell', label: 'Bell' },
  { name: 'buzzer', label: 'Buzzer' },
  { name: 'finishHim', label: 'Finish' },
  { name: 'OG', label: 'OG' },
  { name: 'jacko', label: 'Jacko' },
  { name: 'chopper', label: 'Chopper' },
];

async function previewSound(sound: SoundOption) {
  try {
    const source = resolveSound(sound);
    const { sound: loaded } = await Audio.Sound.createAsync(source);
    await loaded.playAsync();
    loaded.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) {
        loaded.unloadAsync();
      }
    });
  } catch (e) {
    console.warn('Preview error:', e);
  }
}

export default function SoundPickerScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: 'roundEnd' | 'restEnd' }>();
  const {
    roundEndSound,
    restEndSound,
    customRecordings,
    setRoundEndSound,
    setRestEndSound,
    removeRecording,
  } = useSettingsStore();

  const currentSound = type === 'roundEnd' ? roundEndSound : restEndSound;
  const setSound = type === 'roundEnd' ? setRoundEndSound : setRestEndSound;
  const title = type === 'roundEnd' ? 'Round End Sound' : 'Rest End Sound';

  function isSelected(sound: SoundOption): boolean {
    if (sound.type === 'custom' && currentSound.type === 'custom') {
      return sound.uri === currentSound.uri;
    }
    if (sound.type === 'preset' && currentSound.type === 'preset') {
      return sound.name === currentSound.name;
    }
    return false;
  }

  function confirmDelete(uri: string, label: string) {
    Alert.alert('Delete Recording', `Are you sure you want to delete "${label}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (roundEndSound.type === 'custom' && roundEndSound.uri === uri) {
            setRoundEndSound({ type: 'preset', name: 'OG' });
          }
          if (restEndSound.type === 'custom' && restEndSound.uri === uri) {
            setRestEndSound({ type: 'preset', name: 'buzzer' });
          }
          removeRecording(uri);
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScreenHeader title={title} onBack={() => router.back()} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presets</Text>
          <View style={styles.card}>
            {PRESET_SOUNDS.map((item, index) => {
              const sound: SoundOption = { type: 'preset', name: item.name };
              const selected = isSelected(sound);
              return (
                <View key={item.name}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => {
                      setSound(sound);
                      router.back();
                    }}
                  >
                    <View style={styles.rowLeft}>
                      {selected && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color={colors.accent}
                          style={styles.check}
                        />
                      )}
                      <Text style={[styles.rowLabel, selected && styles.rowLabelSelected]}>
                        {item.label}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.previewBtn} onPress={() => previewSound(sound)}>
                      <Ionicons name="play-circle-outline" size={24} color={colors.textMuted} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {index < PRESET_SOUNDS.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        </View>

        {customRecordings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Recordings</Text>
            <View style={styles.card}>
              {customRecordings.map((recording, index) => {
                const sound: SoundOption = {
                  type: 'custom',
                  uri: recording.uri,
                  label: recording.label,
                };
                const selected = isSelected(sound);
                return (
                  <View key={recording.uri}>
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={styles.rowLeft}
                        onPress={() => {
                          setSound(sound);
                          router.back();
                        }}
                      >
                        {selected && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color={colors.accent}
                            style={styles.check}
                          />
                        )}
                        <Text style={[styles.rowLabel, selected && styles.rowLabelSelected]}>
                          {recording.label}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.rowRight}>
                        <TouchableOpacity
                          style={styles.previewBtn}
                          onPress={() => previewSound(sound)}
                        >
                          <Ionicons name="play-circle-outline" size={24} color={colors.textMuted} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => confirmDelete(recording.uri, recording.label)}
                        >
                          <Ionicons name="trash-outline" size={20} color={colors.accent} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {index < customRecordings.length - 1 && <View style={styles.divider} />}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.recordBtn}
            onPress={() => router.push({ pathname: '/recordSound', params: { type } })}
          >
            <Ionicons name="mic-outline" size={20} color={colors.text} />
            <Text style={styles.recordBtnText}>Record New Sound</Text>
          </TouchableOpacity>
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
    paddingHorizontal: padding.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  check: {
    marginRight: spacing.sm,
  },
  rowLabel: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.normal,
  },
  rowLabelSelected: {
    color: colors.accent,
  },
  previewBtn: {
    padding: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.textMuted,
  },
  recordBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    paddingVertical: spacing.md,
  },
  recordBtnText: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wide,
  },
  deleteBtn: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
