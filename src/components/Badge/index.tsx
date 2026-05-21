import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type BadgeVariant = 'success' | 'failure' | 'upcoming';

interface BadgeProps {
  variant: BadgeVariant;
  testID?: string;
  accessibilityLabel?: string;
}

const LABELS: Record<BadgeVariant, string> = {
  success: 'Sucesso',
  failure: 'Falha',
  upcoming: 'Programado',
};

const BG_COLORS: Record<BadgeVariant, string> = {
  success: colors.success,
  failure: colors.failure,
  upcoming: colors.upcoming,
};

export function Badge({ variant, testID, accessibilityLabel }: BadgeProps) {
  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? testID}
      style={[styles.badge, { backgroundColor: BG_COLORS[variant] }]}
    >
      <Text style={styles.label}>{LABELS[variant]}</Text>
    </View>
  );
}

function getLaunchVariant(success: boolean | null, upcoming: boolean): BadgeVariant {
  if (upcoming) return 'upcoming';
  if (success === true) return 'success';
  return 'failure';
}

Badge.getLaunchVariant = getLaunchVariant;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  label: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
