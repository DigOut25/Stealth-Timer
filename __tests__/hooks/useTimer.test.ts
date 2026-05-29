import { renderHook, act } from '@testing-library/react-native';
import { useTimer } from '../../hooks/useTimer';

jest.useFakeTimers();

// Mock expo-av so sound doesn't error in tests
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

describe('useTimer', () => {
  const defaultProps = {
    totalSeconds: 10,
    totalRounds: 3,
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

  it('moves to next round when timer hits 0', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.currentRound).toBe(2);
    expect(result.current.secondsLeft).toBe(10);
  });
  it('stops and sets finished after final round', () => {
    const { result } = renderHook(() => useTimer(defaultProps));

    // Round 1
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    // Round 2
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    // Round 3
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    // Extra tick to flush state
    act(() => {
      jest.advanceTimersByTime(100);
    });

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
    const { result } = renderHook(() => useTimer({ totalSeconds: 3, totalRounds: 1 }));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.secondsLeft).toBe(0);
  });
});
