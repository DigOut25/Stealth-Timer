import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors, spacing, padding, fonts } from '@/constants/theme';
import React from 'react';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  showDivider?: boolean;
};

export function Toggle({ label, value, onValueChange, showDivider = false }: Props) {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.surface, true: colors.accent }}
          thumbColor={colors.text}
        />
      </View>
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
  divider: {
    height: 1,
    backgroundColor: colors.backgroundDark,
    marginHorizontal: padding.card,
  },
});
