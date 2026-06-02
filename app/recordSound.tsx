import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useState, useRef } from 'react';
import { colors, spacing, padding, fonts } from '@/constants';
import { useSettingsStore } from '@/store';
import { SoundOption } from '@/types/sounds';

export default function RecordSoundScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: 'roundEnd' | 'restEnd' }>();
  const { addRecording, setRoundEndSound, setRestEndSound } = useSettingsStore();

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  async function startRecording() {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission required', 'Microphone access is needed to record sounds.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setRecordedUri(null);
    } catch (e) {
      console.warn('Recording error:', e);
    }
  }

  async function stopRecording() {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      if (uri) setRecordedUri(uri);
    } catch (e) {
      console.warn('Stop recording error:', e);
    }
  }

  async function playPreview() {
    try {
      if (!recordedUri) return;
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
      soundRef.current = sound;
      setIsPlaying(true);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    } catch (e) {
      console.warn('Playback error:', e);
    }
  }

  function saveRecording() {
    if (!recordedUri) return;
    setShowNameInput(true);
  }

  function confirmSave() {
    if (!label.trim() || !recordedUri) return;
    addRecording(recordedUri, label.trim());
    const sound: SoundOption = {
      type: 'custom',
      uri: recordedUri,
      label: label.trim(),
    };
    if (type === 'roundEnd') {
      setRoundEndSound(sound);
    } else {
      setRestEndSound(sound);
    }
    router.back();
    router.back();
  }

  return (
    <View style={styles.body}>
      <Text style={styles.hint}>
        {isRecording
          ? 'Recording... tap stop when done'
          : recordedUri
            ? 'Recording saved — preview or save it'
            : 'Tap the mic to start recording'}
      </Text>

      {/* Record button */}
      <TouchableOpacity
        style={[styles.micBtn, isRecording && styles.micBtnActive]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={48} color={colors.text} />
      </TouchableOpacity>

      {isRecording && <Text style={styles.recordingLabel}>Recording...</Text>}

      {/* Preview and save — shown after recording, before naming */}
      {recordedUri && !isRecording && !showNameInput && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={playPreview}>
            <Ionicons
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              size={24}
              color={colors.text}
            />
            <Text style={styles.actionBtnText}>{isPlaying ? 'Playing...' : 'Preview'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnSave]}
            onPress={saveRecording}
          >
            <Ionicons name="checkmark-circle-outline" size={24} color={colors.text} />
            <Text style={styles.actionBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Name input — shown after tapping save */}
      {showNameInput && (
        <View style={styles.nameInputArea}>
          <TextInput
            style={styles.nameInput}
            placeholder="Name your sound..."
            placeholderTextColor={colors.textMuted}
            value={label}
            onChangeText={setLabel}
            autoFocus
          />
          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnSave, !label.trim() && styles.disabled]}
            onPress={confirmSave}
            disabled={!label.trim()}
          >
            <Text style={styles.actionBtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Re-record — shown after recording, before naming */}
      {recordedUri && !isRecording && !showNameInput && (
        <TouchableOpacity style={styles.rerecordBtn} onPress={startRecording}>
          <Text style={styles.rerecordText}>Record Again</Text>
        </TouchableOpacity>
      )}
    </View>
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  hint: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.textMuted,
    letterSpacing: fonts.letterSpacing.wide,
    textAlign: 'center',
  },
  micBtn: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  micBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  recordingLabel: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.accent,
    letterSpacing: fonts.letterSpacing.wider,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundDark,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
  },
  actionBtnSave: {
    backgroundColor: colors.buttonStart,
  },
  actionBtnText: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wide,
  },
  rerecordBtn: {
    paddingVertical: spacing.sm,
  },
  rerecordText: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.textMuted,
    letterSpacing: fonts.letterSpacing.wide,
  },
  nameInputArea: {
    width: '100%',
    gap: spacing.md,
    alignItems: 'center',
  },
  nameInput: {
    width: '100%',
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: padding.card,
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.wide,
  },
  disabled: {
    opacity: 0.4,
  },
});
