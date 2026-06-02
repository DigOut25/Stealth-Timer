import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, padding, fonts } from '@/constants';
import React from 'react';

type Props = {
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  showDivider?: boolean;
};

export function ListItem({
  label,
  value,
  onPress,
  showChevron = true,
  showDivider = false,
}: Props) {
  const Row = onPress ? TouchableOpacity : View;

  return (
    <>
      <Row style={styles.row} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
        {(value || showChevron) && (
          <View style={styles.right}>
            {value && <Text style={styles.value}>{value}</Text>}
            {onPress && showChevron && (
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            )}
          </View>
        )}
      </Row>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: padding.card,
  },
  label: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.text,
    letterSpacing: fonts.letterSpacing.normal,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  value: {
    fontFamily: fonts.family.display,
    fontSize: fonts.size.md,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.backgroundDark,
    marginHorizontal: padding.card,
  },
});
