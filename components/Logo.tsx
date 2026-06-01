import { Image, StyleSheet } from 'react-native';
import { spacing } from '../constants/theme';

export function Logo() {
  return <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 55,
    marginTop: spacing.md,
  },
});
