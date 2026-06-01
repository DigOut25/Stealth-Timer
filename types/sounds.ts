export type PresetSound = 'bell' | 'buzzer' | 'whistle' | 'finishHim';

export type SoundOption =
  | { type: 'preset'; name: PresetSound }
  | { type: 'custom'; uri: string; label: string };

export type CustomRecording = {
  uri: string;
  label: string;
  createdAt: number;
};
