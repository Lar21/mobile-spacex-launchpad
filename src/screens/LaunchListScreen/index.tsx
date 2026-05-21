import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../@types/navigation';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { FilterModal } from '../../components/FilterModal';
import { LaunchCard } from '../../components/LaunchCard';
import { SearchBar } from '../../components/SearchBar';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { TEST_IDS } from '../../utils/testIds';
import { useLaunchList } from './useLaunchList';

import SPACEX_LOGO from '../../../assets/logo-spacex.png';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function LaunchListScreen() {
  const navigation = useNavigation<Nav>();
  const {
    launches,
    loading,
    refreshing,
    error,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    refresh,
    retry,
    filterVisible,
    setFilterVisible,
  } = useLaunchList();

  if (loading) {
    return (
      <SafeAreaView
        testID={TEST_IDS.LAUNCH_LIST_SCREEN}
        accessibilityLabel={TEST_IDS.LAUNCH_LIST_SCREEN}
        style={styles.centered}
        edges={['top']}
      >
        <ActivityIndicator
          testID={TEST_IDS.LAUNCH_LOADING}
          accessibilityLabel={TEST_IDS.LAUNCH_LOADING}
          size="large"
          color={colors.accent}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        testID={TEST_IDS.LAUNCH_LIST_SCREEN}
        accessibilityLabel={TEST_IDS.LAUNCH_LIST_SCREEN}
        style={styles.container}
        edges={['top']}
      >
        <ErrorState message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      testID={TEST_IDS.LAUNCH_LIST_SCREEN}
      accessibilityLabel={TEST_IDS.LAUNCH_LIST_SCREEN}
      style={styles.container}
      edges={['top']}
    >
      <View style={styles.topBar}>
        <Image source={SPACEX_LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchFlex}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
        <TouchableOpacity
          testID={TEST_IDS.LAUNCH_FILTER_BUTTON}
          accessibilityLabel={TEST_IDS.LAUNCH_FILTER_BUTTON}
          style={[
            styles.filterButton,
            filterStatus !== 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons
            name="filter"
            size={20}
            color={filterStatus !== 'all' ? colors.white : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        testID={TEST_IDS.LAUNCH_LIST}
        accessibilityLabel={TEST_IDS.LAUNCH_LIST}
        data={launches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LaunchCard
            launch={item}
            onPress={() => navigation.navigate('LaunchDetail', { launchId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.accent}
          />
        }
        ListEmptyComponent={
          <EmptyState
            testID={TEST_IDS.LAUNCH_EMPTY_MESSAGE}
            icon="rocket-outline"
            title="Nenhum lançamento encontrado"
            subtitle="Tente ajustar sua busca ou filtro."
          />
        }
      />

      <FilterModal
        visible={filterVisible}
        current={filterStatus}
        onSelect={setFilterStatus}
        onClose={() => setFilterVisible(false)}
      />
    </SafeAreaView>
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
  topBar: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  logo: {
    height: 34,
    width: 144,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchFlex: {
    flex: 1,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.sm,
  },
});
