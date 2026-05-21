import React, { useState } from 'react';
import PLACEHOLDER from '../../../assets/placeholder.png';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { Badge } from '../../components/Badge';
import { formatDate } from '../../utils/formatDate';
import { TEST_IDS } from '../../utils/testIds';
import { useLaunchDetail } from './useLaunchDetail';

export function LaunchDetailScreen() {
  const { navigation, launch, launchpad, loading, variant, favorited, toggleFavorite } = useLaunchDetail();

  if (loading || !launch) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView
      testID={TEST_IDS.LAUNCH_DETAIL_SCREEN}
      accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_SCREEN}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <PatchImage uri={launch.links.patch.large} />

      <View style={styles.header}>
        <Text
          testID={TEST_IDS.LAUNCH_DETAIL_NAME}
          accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_NAME}
          style={styles.name}
        >
          {launch.name}
        </Text>
        <Badge
          variant={variant}
          testID={TEST_IDS.LAUNCH_DETAIL_BADGE}
        />
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
        <Text
          testID={TEST_IDS.LAUNCH_DETAIL_DATE}
          accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_DATE}
          style={styles.meta}
        >
          {formatDate(launch.date_utc)}
        </Text>
      </View>

      {launchpad && (
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text
            testID={TEST_IDS.LAUNCH_DETAIL_SITE}
            accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_SITE}
            style={styles.meta}
          >
            {launchpad.full_name}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          testID={favorited ? TEST_IDS.LAUNCH_DETAIL_FAVORITE_ACTIVE : TEST_IDS.LAUNCH_DETAIL_FAVORITE_BUTTON}
          accessibilityLabel={favorited ? TEST_IDS.LAUNCH_DETAIL_FAVORITE_ACTIVE : TEST_IDS.LAUNCH_DETAIL_FAVORITE_BUTTON}
          style={[styles.actionButton, favorited && styles.actionButtonActive]}
          onPress={() => toggleFavorite(launch.id)}
        >
          <Ionicons
            name={favorited ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={favorited ? colors.white : colors.textSecondary}
          />
          <Text style={[styles.actionText, favorited && styles.actionTextActive]}>
            {favorited ? 'Salvo' : 'Salvar'}
          </Text>
        </TouchableOpacity>

        {launch.rocket && (
          <TouchableOpacity
            testID={TEST_IDS.LAUNCH_DETAIL_ROCKET_LINK}
            accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_ROCKET_LINK}
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate('RocketDetail', {
                rocketId: launch.rocket,
                rocketName: 'Foguete',
              })
            }
          >
            <Ionicons name="rocket-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.actionText}>Ver foguete</Text>
          </TouchableOpacity>
        )}
      </View>

      {launch.details ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes</Text>
          <Text
            testID={TEST_IDS.LAUNCH_DETAIL_DETAILS}
            accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_DETAILS}
            style={styles.details}
          >
            {launch.details}
          </Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Links</Text>
        {launch.links.webcast ? (
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL(launch.links.webcast!)}
          >
            <Ionicons name="logo-youtube" size={18} color={colors.failure} />
            <Text style={styles.linkText}>Assistir no YouTube</Text>
          </TouchableOpacity>
        ) : null}
        {launch.links.wikipedia ? (
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL(launch.links.wikipedia!)}
          >
            <Ionicons name="globe-outline" size={18} color={colors.accent} />
            <Text style={styles.linkText}>Wikipedia</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

function PatchImage({ uri }: { uri: string | null | undefined }) {
  const [failed, setFailed] = useState(false);
  const source = uri && !failed ? { uri } : PLACEHOLDER;
  return (
    <Image
      testID={TEST_IDS.LAUNCH_DETAIL_PATCH}
      accessibilityLabel={TEST_IDS.LAUNCH_DETAIL_PATCH}
      source={source}
      style={styles.patch}
      resizeMode="contain"
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  patch: {
    width: 160,
    height: 160,
    alignSelf: 'center',
  },
header: {
    gap: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  actionText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  actionTextActive: {
    color: colors.white,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  details: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkText: {
    color: colors.text,
    fontSize: 15,
  },
});
