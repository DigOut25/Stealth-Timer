import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PresetSound = 'bell' | 'buzzer' | 'whistle';

export type SoundOption =
  | { type: 'preset'; name: PresetSound }
  | { type: 'custom'; uri: string; label: string };

export type CustomRecording = {
  uri: string;
  label: string;
  createdAt: number;
};

type SettingsStore = {
  roundEndSound: SoundOption;
  restEndSound: SoundOption;
  hapticsEnabled: boolean;
  keepAwake: boolean;
  customRecordings: CustomRecording[];
  setRoundEndSound: (val: SoundOption) => void;
  setRestEndSound: (val: SoundOption) => void;
  setHapticsEnabled: (val: boolean) => void;
  setKeepAwake: (val: boolean) => void;
  addRecording: (uri: string, label: string) => void;
  removeRecording: (uri: string) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      roundEndSound: { type: 'preset', name: 'bell' },
      restEndSound: { type: 'preset', name: 'buzzer' },
      hapticsEnabled: true,
      keepAwake: true,
      customRecordings: [],
      setRoundEndSound: val => set({ roundEndSound: val }),
      setRestEndSound: val => set({ restEndSound: val }),
      setHapticsEnabled: val => set({ hapticsEnabled: val }),
      setKeepAwake: val => set({ keepAwake: val }),
      addRecording: (uri, label) =>
        set(state => ({
          customRecordings: [...state.customRecordings, { uri, label, createdAt: Date.now() }],
        })),
      removeRecording: uri =>
        set(state => ({
          customRecordings: state.customRecordings.filter(r => r.uri !== uri),
        })),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
