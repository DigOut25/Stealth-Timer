import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SystemUI from 'expo-system-ui';

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#6B6F7E');
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}