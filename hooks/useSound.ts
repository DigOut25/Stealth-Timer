import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export function useSound(soundFile: any) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    async function load() {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      soundRef.current = sound;
    }
    load();
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  const play = async () => {
    try {
      await soundRef.current?.replayAsync();
    } catch (e) {
      console.warn('Sound error:', e);
    }
  };

  return { play };
}