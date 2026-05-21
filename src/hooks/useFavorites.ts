import { useState, useEffect, useCallback } from 'react';
import { getFavorites, saveFavorites } from '../services/storage';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    getFavorites().then(setFavoriteIds);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const updated = favoriteIds.includes(id)
        ? favoriteIds.filter((fid) => fid !== id)
        : [...favoriteIds, id];
      setFavoriteIds(updated);
      await saveFavorites(updated);
    },
    [favoriteIds],
  );

  const removeFavorite = useCallback(
    async (id: string) => {
      const updated = favoriteIds.filter((fid) => fid !== id);
      setFavoriteIds(updated);
      await saveFavorites(updated);
    },
    [favoriteIds],
  );

  return { favoriteIds, isFavorite, toggleFavorite, removeFavorite };
}
