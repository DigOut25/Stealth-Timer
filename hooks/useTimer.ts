import { useEffect, useRef, useState } from 'react';
import { useSound } from './useSound';
import { useSettingsStore } from '@/store';
import { useHaptics } from './useHaptics';
import * as Haptics from 'expo-haptics';

type Props = {
  totalSeconds: number;
  totalRounds: number;
  restSeconds: number;
};

export function useTimer({ totalSeconds, totalRounds, restSeconds }: Props) {
  const { roundEndSound, restEndSound } = useSettingsStore();
  const { play: playRoundEnd } = useSound(roundEndSound);
  const { play: playRestEnd } = useSound(restEndSound);
  const { impact, notification } = useHaptics();

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRestingRef = useRef(false);
  const currentRoundRef = useRef(1);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setCurrentRound(1);
    setIsResting(false);
    setRunning(true);
    setFinished(false);
    isRestingRef.current = false;
    currentRoundRef.current = 1;
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (isRestingRef.current) {
              // Rest finished — next round
              playRestEnd();
              impact(Haptics.ImpactFeedbackStyle.Heavy);
              isRestingRef.current = false;
              setIsResting(false);
              currentRoundRef.current = currentRoundRef.current + 1;
              setCurrentRound(currentRoundRef.current);
              return totalSeconds;
            } else if (currentRoundRef.current < totalRounds) {
              // Round finished — start rest or next round
              playRoundEnd();
              impact(Haptics.ImpactFeedbackStyle.Heavy);
              if (restSeconds > 0) {
                isRestingRef.current = true;
                setIsResting(true);
                return restSeconds;
              } else {
                currentRoundRef.current = currentRoundRef.current + 1;
                setCurrentRound(currentRoundRef.current);
                return totalSeconds;
              }
            } else {
              // Final round finished
              playRoundEnd();
              notification(Haptics.NotificationFeedbackType.Success);
              setRunning(false);
              setFinished(true);
              clearInterval(intervalRef.current!);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  return { secondsLeft, currentRound, isResting, running, finished, setRunning };
}
