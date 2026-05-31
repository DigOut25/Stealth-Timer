export const theme = {
  colors: {
    background: '#000000',
    backgroundDark: '#5a5d6b',
    surface: '#7a7d8c',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.6)',
    textDark: 'rgba(0,0,0,0.5)',
    accent: '#E8605A',
    buttonPause: '#5B7FA6',
    buttonStop: '#E8605A',
    buttonStart: 'rgba(7, 201, 0, 0.85)',
    timerText: 'white',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  padding: {
    screen: 20,
    card: 16,
    button: 12,
    input: 12,
  },

  margin: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    sm: 8,
    md: 12,
    button: 25,
    card: 16,
    full: 999,
  },

  fonts: {
    family: {
      regular: 'System',
      display: 'Oswald_700Bold',
    },
    size: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 28,
      timer: 96,
      logo: 42,
    },
    weight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      black: '900' as const,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
    },
    letterSpacing: {
      tight: -2,
      normal: 0,
      wide: 1,
      wider: 4,
      widest: 8,
    },
  },
} as const;

export const { colors, spacing, padding, margin, radius, fonts } = theme;
