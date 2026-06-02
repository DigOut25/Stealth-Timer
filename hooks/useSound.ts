import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { SoundOption } from '@/types/sounds';

const soundMap = {
  bell: require('@/assets/sounds/bell.wav'),
  buzzer: require('@/assets/sounds/Buzzer.mp3'),
  whistle: require('@/assets/sounds/whistle.wav'),
  finishHim: require('@/assets/sounds/FinishHim.mp3'),
};

export function resolveSound(sound: SoundOption) {
  if (sound.type === 'custom') {
    return { uri: sound.uri };
  }
  return soundMap[sound.name];
}

export function useSound(sound: SoundOption) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    async function load() {
      const source = resolveSound(sound);
      const { sound: loaded } = await Audio.Sound.createAsync(source);
      soundRef.current = loaded;
    }
    load();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [sound.type === 'custom' ? sound.uri : sound.name]);

  const play = async () => {
    try {
      await soundRef.current?.replayAsync();
    } catch (e) {
      console.warn('Sound error:', e);
    }
  };

  return { play };
}
