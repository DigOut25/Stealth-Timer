import { useEffect, useRef, useState } from 'react';
import { useSound } from './useSound';

type Props = {
  totalSeconds: number;
  totalRounds: number;
};

export function useTimer({ totalSeconds, totalRounds }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [currentRound, setCurrentRound] = useState(1);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { play: playBell } = useSound(require('../assets/sounds/Buzzer.mp3'));

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (currentRound < totalRounds) {
              playBell();
              setCurrentRound(r => r + 1);
              return totalSeconds;
            } else {
              playBell();
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
  }, [running, currentRound]);

  return { secondsLeft, currentRound, running, finished, setRunning };
}