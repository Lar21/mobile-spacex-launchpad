import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PLACEHOLDER from '../../../assets/placeholder.png';
import type { Launch } from '../../api/types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { formatDate } from '../../utils/formatDate';
import { TEST_IDS } from '../../utils/testIds';
import { Badge } from '../Badge';

interface LaunchCardProps {
  launch: Launch;
  onPress: () => void;
}

export function LaunchCard({ launch, onPress }: LaunchCardProps) {
  const variant = Badge.getLaunchVariant(launch.success, launch.upcoming);

  return (
    <TouchableOpacity
      testID={TEST_IDS.LAUNCH_LIST_ITEM(launch.id)}
      accessibilityLabel={TEST_IDS.LAUNCH_LIST_ITEM(launch.id)}
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.patchContainer}>
        {launch.links.patch.small ? (
          <Image
            source={{ uri: launch.links.patch.small }}
            style={styles.patch}
            resizeMode="contain"
          />
        ) : (
          <Image source={PLACEHOLDER} style={styles.patch} resizeMode="contain" />
        )}
      </View>

      <View style={styles.info}>
        <Text
          testID={TEST_IDS.LAUNCH_ITEM_NAME(launch.id)}
          accessibilityLabel={TEST_IDS.LAUNCH_ITEM_NAME(launch.id)}
          style={styles.name}
          numberOfLines={1}
        >
          {launch.name}
        </Text>
        <Text
          testID={TEST_IDS.LAUNCH_ITEM_DATE(launch.id)}
          accessibilityLabel={TEST_IDS.LAUNCH_ITEM_DATE(launch.id)}
          style={styles.date}
        >
          {formatDate(launch.date_utc)}
        </Text>
        <Badge
          variant={variant}
          testID={TEST_IDS.LAUNCH_ITEM_BADGE(launch.id)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  patchContainer: {
    width: 60,
    height: 60,
    marginRight: spacing.md,
  },
  patch: {
    width: 60,
    height: 60,
  },
info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  date: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
