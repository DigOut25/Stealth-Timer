import { View, StyleSheet } from 'react-native';
import { colors, radius } from '@/constants';

type Props = {
  children: React.ReactNode;
};

export function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
});
