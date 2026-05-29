import { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../constants/theme';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      // Fade + scale in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Hold
      Animated.delay(1200),
      // Fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 140,
  },
});
