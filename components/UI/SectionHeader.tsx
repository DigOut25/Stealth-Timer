import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../../constants/theme';

type Props = {
  title: string;
};

export function SectionHeader({ title }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.sm,
    color: colors.textMuted,
    letterSpacing: fonts.letterSpacing.wider,
    textTransform: 'uppercase',
  },
});
