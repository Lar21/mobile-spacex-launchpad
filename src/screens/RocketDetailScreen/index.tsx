import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { Badge } from '../../components/Badge';
import { TEST_IDS } from '../../utils/testIds';
import { useRocketDetail } from './useRocketDetail';

const { width } = Dimensions.get('window');

export function RocketDetailScreen() {
  const { rocket, loading } = useRocketDetail();

  if (loading || !rocket) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView
      testID={TEST_IDS.ROCKET_DETAIL_SCREEN}
      accessibilityLabel={TEST_IDS.ROCKET_DETAIL_SCREEN}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {rocket.flickr_images.length > 0 ? (
        <FlatList
          data={rocket.flickr_images}
          horizontal
          pagingEnabled
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <RocketImage uri={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />
      ) : (
        <Image
          source={PLACEHOLDER}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.padded}>
        <View style={styles.titleRow}>
          <Text
            testID={TEST_IDS.ROCKET_DETAIL_NAME}
            accessibilityLabel={TEST_IDS.ROCKET_DETAIL_NAME}
            style={styles.name}
          >
            {rocket.name}
          </Text>
          {rocket.active && (
            <Badge
              variant="success"
              testID={TEST_IDS.ROCKET_DETAIL_ACTIVE_BADGE}
            />
          )}
        </View>

        <Text
          testID={TEST_IDS.ROCKET_DETAIL_DESCRIPTION}
          accessibilityLabel={TEST_IDS.ROCKET_DETAIL_DESCRIPTION}
          style={styles.description}
        >
          {rocket.description}
        </Text>

        <Text style={styles.sectionTitle}>Especificações</Text>

        <View style={styles.statsGrid}>
          <StatCard
            testID={TEST_IDS.ROCKET_DETAIL_HEIGHT}
            label="Altura"
            value={`${rocket.height.meters}m`}
          />
          <StatCard
            testID={TEST_IDS.ROCKET_DETAIL_MASS}
            label="Massa"
            value={`${(rocket.mass.kg / 1000).toFixed(0)}t`}
          />
          <StatCard
            testID={TEST_IDS.ROCKET_DETAIL_SUCCESS_RATE}
            label="Taxa de sucesso"
            value={`${rocket.success_rate_pct}%`}
          />
          <StatCard
            testID={TEST_IDS.ROCKET_DETAIL_FIRST_FLIGHT}
            label="Primeiro voo"
            value={rocket.first_flight}
          />
        </View>
      </View>
    </ScrollView>
  );
}

import PLACEHOLDER from '../../../assets/placeholder.png';

function RocketImage({ uri, index }: { uri: string; index: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      testID={`rocket-detail-image-item-${index}`}
      accessibilityLabel={`rocket-detail-image-item-${index}`}
      source={failed ? PLACEHOLDER : { uri }}
      style={styles.carouselImage}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
}

function StatCard({ testID, label, value }: { testID: string; label: string; value: string }) {
  return (
    <View
      testID={testID}
      accessibilityLabel={testID}
      style={styles.statCard}
    >
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
    gap: spacing.lg,
  },
  carousel: {
    height: 220,
  },
  carouselImage: {
    width,
    height: 220,
  },
  padded: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    minWidth: '45%',
    flex: 1,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
