import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { TEST_IDS } from '../../utils/testIds';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={52} color={colors.failure} />
      <Text
        testID={TEST_IDS.LAUNCH_ERROR_MESSAGE}
        accessibilityLabel={TEST_IDS.LAUNCH_ERROR_MESSAGE}
        style={styles.message}
      >
        {message}
      </Text>
      <TouchableOpacity
        testID={TEST_IDS.LAUNCH_RETRY_BUTTON}
        accessibilityLabel={TEST_IDS.LAUNCH_RETRY_BUTTON}
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Ionicons name="refresh" size={16} color={colors.white} />
        <Text style={styles.retryText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  message: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});
