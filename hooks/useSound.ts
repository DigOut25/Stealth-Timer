import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { SoundOption } from '@/types/sounds';

const soundMap = {
  bell: require('@/assets/sounds/bell.wav'),
  buzzer: require('@/assets/sounds/Buzzer.mp3'),
  finishHim: require('@/assets/sounds/FinishHim.mp3'),
  OG: require('@/assets/sounds/OG.m4a'),
  chopper: require('@/assets/sounds/chopper.mp3'),
  jacko: require('@/assets/sounds/jacko.mp3'),
};

export function resolveSound(sound: SoundOption) {
  if (sound.type === 'custom') {
    return { uri: sound.uri };
  }
  return soundMap[sound.name];
}

export function useSound(sound: SoundOption) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    async function load() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
        const source = resolveSound(sound);
        const { sound: loaded } = await Audio.Sound.createAsync(source);
        soundRef.current = loaded;
        isLoadedRef.current = true;
      } catch (e) {
        console.warn('Sound load error:', e);
      }
    }
    load();
    return () => {
      isLoadedRef.current = false;
      soundRef.current?.unloadAsync();
    };
  }, [sound.type === 'custom' ? sound.uri : (sound as any).name]);

  const play = async () => {
    try {
      if (!isLoadedRef.current || !soundRef.current) {
        console.warn('Sound not loaded yet');
        return;
      }
      await soundRef.current.replayAsync();
    } catch (e) {
      console.warn('Sound error:', e);
    }
  };

  return { play, resolveSound };
}
