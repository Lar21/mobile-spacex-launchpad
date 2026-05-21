import { useState, useEffect, useCallback } from 'react';
import { fetchLaunches } from '../api/spacex';
import type { Launch, LaunchStatus } from '../api/types';

export type FilterStatus = 'all' | LaunchStatus;

export function useLaunches() {
  const [allLaunches, setAllLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await fetchLaunches();
      const sorted = [...data].sort((a, b) => b.date_unix - a.date_unix);
      setAllLaunches(sorted);
    } catch {
      setError('Não foi possível carregar os lançamentos. Verifique sua conexão.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredLaunches = allLaunches.filter((launch) => {
    const matchesSearch = launch.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterStatus === 'success') matchesFilter = launch.success === true;
    else if (filterStatus === 'failure') matchesFilter = launch.success === false && !launch.upcoming;
    else if (filterStatus === 'upcoming') matchesFilter = launch.upcoming;

    return matchesSearch && matchesFilter;
  });

  return {
    launches: filteredLaunches,
    loading,
    refreshing,
    error,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    refresh: () => load(true),
    retry: () => load(false),
  };
}
