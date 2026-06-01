import { renderHook, act } from '@testing-library/react-native';
import { useTimer } from '../../hooks/useTimer';

jest.useFakeTimers();

jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn().mockResolvedValue({
        sound: {
          replayAsync: jest.fn(),
          unloadAsync: jest.fn(),
        },
      }),
    },
  },
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Heavy: 'heavy', Light: 'light', Medium: 'medium' },
  NotificationFeedbackType: { Success: 'success', Error: 'error', Warning: 'warning' },
}));

jest.mock('../../store/useSettingsStore', () => ({
  useSettingsStore: () => ({
    roundEndSound: { type: 'preset', name: 'bell' },
    restEndSound: { type: 'preset', name: 'buzzer' },
    hapticsEnabled: true,
  }),
}));

describe('useTimer', () => {
  const defaultProps = {
    totalSeconds: 10,
    totalRounds: 3,
    restSeconds: 0,
  };

  const propsWithRest = {
    totalSeconds: 10,
    totalRounds: 3,
    restSeconds: 5,
  };

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('starts with correct initial state', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    expect(result.current.secondsLeft).toBe(10);
    expect(result.current.currentRound).toBe(1);
    expect(result.current.running).toBe(true);
    expect(result.current.finished).toBe(false);
    expect(result.current.isResting).toBe(false);
  });

  it('counts down each second', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(9);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(8);
  });

  it('moves to next round when timer hits 0 with no rest', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.currentRound).toBe(2);
    expect(result.current.secondsLeft).toBe(10);
    expect(result.current.isResting).toBe(false);
  });

  it('starts rest period after round ends when restSeconds > 0', () => {
    const { result } = renderHook(() => useTimer(propsWithRest));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.isResting).toBe(true);
    expect(result.current.secondsLeft).toBe(5);
    expect(result.current.currentRound).toBe(1);
  });

  it('starts next round after rest period ends', () => {
    const { result } = renderHook(() => useTimer(propsWithRest));

    // Round 1 ends
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(result.current.isResting).toBe(true);

    // Rest ends
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.isResting).toBe(false);
    expect(result.current.currentRound).toBe(2);
    expect(result.current.secondsLeft).toBe(10);
  });

  it('stops and sets finished after final round with no rest', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    act(() => {
      jest.advanceTimersByTime(10000);
    });
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.finished).toBe(true);
    expect(result.current.running).toBe(false);
    expect(result.current.secondsLeft).toBe(0);
  });

  it('stops and sets finished after final round with rest', () => {
    const { result } = renderHook(() => useTimer(propsWithRest));

    // Round 1 → rest → Round 2 → rest → Round 3
    act(() => {
      jest.advanceTimersByTime(10000);
    }); // round 1
    act(() => {
      jest.advanceTimersByTime(5000);
    }); // rest 1
    act(() => {
      jest.advanceTimersByTime(10000);
    }); // round 2
    act(() => {
      jest.advanceTimersByTime(5000);
    }); // rest 2
    act(() => {
      jest.advanceTimersByTime(10000);
    }); // round 3
    act(() => {
      jest.advanceTimersByTime(100);
    }); // flush

    expect(result.current.finished).toBe(true);
    expect(result.current.running).toBe(false);
    expect(result.current.secondsLeft).toBe(0);
  });

  it('pauses when setRunning is called with false', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    act(() => {
      result.current.setRunning(false);
    });
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.secondsLeft).toBe(10);
  });

  it('resumes after pausing', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    act(() => {
      result.current.setRunning(false);
    });
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    act(() => {
      result.current.setRunning(true);
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.secondsLeft).toBe(8);
  });

  it('does not go below 0', () => {
    const { result } = renderHook(() =>
      useTimer({ totalSeconds: 3, totalRounds: 1, restSeconds: 0 })
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.secondsLeft).toBe(0);
  });
});
