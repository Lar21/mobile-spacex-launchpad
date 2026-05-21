import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { LaunchCard } from '../../components/LaunchCard';
import { EmptyState } from '../../components/EmptyState';
import { TEST_IDS } from '../../utils/testIds';
import type { Launch } from '../../api/types';
import { useFavoritesScreen } from './useFavoritesScreen';

export function FavoritesScreen() {
  const { navigation, launches, loading, removeFavorite } = useFavoritesScreen();

  if (loading) {
    return (
      <SafeAreaView style={styles.centered} edges={['top']}>
        <ActivityIndicator size="large" color={colors.accent} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      testID={TEST_IDS.FAVORITES_SCREEN}
      accessibilityLabel={TEST_IDS.FAVORITES_SCREEN}
      style={styles.container}
      edges={['top']}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Favoritos</Text>
        {launches.length > 0 && (
          <View style={styles.countPill}>
            <Text style={styles.countText}>{launches.length}</Text>
          </View>
        )}
      </View>

      <FlatList
        testID={TEST_IDS.FAVORITES_LIST}
        accessibilityLabel={TEST_IDS.FAVORITES_LIST}
        data={launches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteItem
            launch={item}
            onPress={() => navigation.navigate('LaunchDetail', { launchId: item.id })}
            onRemove={() => removeFavorite(item.id)}
            removeTestID={TEST_IDS.FAVORITES_REMOVE_BUTTON(item.id)}
          />
        )}
        contentContainerStyle={[
          styles.list,
          launches.length === 0 && styles.listEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyState
            testID={TEST_IDS.FAVORITES_EMPTY_MESSAGE}
            icon="bookmark-outline"
            title="Nenhum favorito ainda"
            subtitle="Abra um lançamento e toque em Salvar para adicioná-lo aqui."
          />
        }
      />
    </SafeAreaView>
  );
}

function FavoriteItem({
  launch,
  onPress,
  onRemove,
  removeTestID,
}: {
  launch: Launch;
  onPress: () => void;
  onRemove: () => void;
  removeTestID: string;
}) {
  return (
    <View style={styles.itemWrapper}>
      <LaunchCard launch={launch} onPress={onPress} />
      <TouchableOpacity
        testID={removeTestID}
        accessibilityLabel={removeTestID}
        style={styles.bookmarkBtn}
        onPress={onRemove}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="bookmark" size={15} color={colors.accent} />
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  countPill: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: spacing.sm,
  },
  itemWrapper: {
    position: 'relative',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
