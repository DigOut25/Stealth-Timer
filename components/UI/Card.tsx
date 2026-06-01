import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

type Props = {
  children: React.ReactNode;
};

export function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
