import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TimerDisplay } from '../../components/Timer';

jest.mock('@expo-google-fonts/oswald', () => ({
  useFonts: () => [true, null],
  Oswald_700Bold: 'Oswald_700Bold',
}));

describe('TimerDisplay', () => {
  const defaultProps = {
    secondsLeft: 300,
    currentRound: 1,
    totalRounds: 3,
  };

  it('formats minutes and seconds correctly', () => {
    render(<TimerDisplay {...defaultProps} secondsLeft={300} />);
    expect(screen.getByText('5:00')).toBeTruthy();
  });

  it('pads single digit seconds with zero', () => {
    render(<TimerDisplay {...defaultProps} secondsLeft={91} />);
    expect(screen.getByText('1:31')).toBeTruthy();
  });

  it('displays 0:00 for zero seconds', () => {
    render(<TimerDisplay {...defaultProps} secondsLeft={0} />);
    expect(screen.getByText('0:00')).toBeTruthy();
  });

  it('shows round label by default', () => {
    render(<TimerDisplay {...defaultProps} />);
    expect(screen.getByText('Round 1 of 3')).toBeTruthy();
  });

  it('hides round label when showRound is false', () => {
    render(<TimerDisplay {...defaultProps} showRound={false} />);
    expect(screen.queryByText('Round 1 of 3')).toBeNull();
  });

  it('displays correct round number', () => {
    render(<TimerDisplay {...defaultProps} currentRound={2} totalRounds={5} />);
    expect(screen.getByText('Round 2 of 5')).toBeTruthy();
  });

  it('formats seconds under a minute correctly', () => {
    render(<TimerDisplay {...defaultProps} secondsLeft={45} />);
    expect(screen.getByText('0:45')).toBeTruthy();
  });

  it('shows Rest label when isResting is true', () => {
    render(<TimerDisplay {...defaultProps} isResting={true} />);
    expect(screen.getByText('Rest')).toBeTruthy();
  });

  it('shows round label when isResting is false', () => {
    render(<TimerDisplay {...defaultProps} isResting={false} />);
    expect(screen.getByText('Round 1 of 3')).toBeTruthy();
  });
});
