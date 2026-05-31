import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SessionStore = {
  roundLength: number;
  restLength: number;
  numRounds: number;
  setRoundLength: (val: number) => void;
  setRestLength: (val: number) => void;
  setNumRounds: (val: number) => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    set => ({
      roundLength: 5,
      restLength: 30,
      numRounds: 3,
      setRoundLength: val => set({ roundLength: val }),
      setRestLength: val => set({ restLength: val }),
      setNumRounds: val => set({ numRounds: val }),
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
