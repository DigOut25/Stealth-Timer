import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { useFonts, Oswald_700Bold } from '@expo-google-fonts/oswald';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({ Oswald_700Bold });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#000000');
  }, []);

  const opacity = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().then(() => {
        Animated.sequence([
          // Fade in logo
          Animated.timing(fadeIn, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          // Hold
          Animated.delay(1000),
          // Fade out
          Animated.timing(opacity, {
            toValue: 0,
            duration: 800,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start(() => setShowSplash(false));
      });
    }
  }, [fontsLoaded, fontError]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ThemeProvider value={DarkTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" options={{ animation: 'fade' }} />
          <Stack.Screen name="countdown" options={{ animation: 'fade' }} />
        </Stack>
        {showSplash && (
          <Animated.View style={[styles.splash, { opacity }]}>
            <Animated.Image
              source={require('../assets/logo.png')}
              style={[styles.logo, { opacity: fadeIn }]}
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  logo: {
    width: 280,
    height: 140,
  },
});
