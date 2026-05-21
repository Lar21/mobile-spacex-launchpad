import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../../hooks/useFavorites';
import { getFavorites } from '../../services/storage';
import { fetchLaunchById } from '../../api/spacex';
import type { Launch } from '../../api/types';
import type { RootStackParamList } from '../../@types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useFavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const { removeFavorite } = useFavorites();
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getFavorites()
        .then(async (ids) => {
          if (ids.length === 0) {
            setLaunches([]);
            return;
          }
          const data = await Promise.all(ids.map((id) => fetchLaunchById(id)));
          setLaunches(data);
        })
        .catch(() => setLaunches([]))
        .finally(() => setLoading(false));
    }, []),
  );

  const handleRemove = async (id: string) => {
    await removeFavorite(id);
    setLaunches((prev) => prev.filter((l) => l.id !== id));
  };

  return { navigation, launches, loading, removeFavorite: handleRemove };
}
