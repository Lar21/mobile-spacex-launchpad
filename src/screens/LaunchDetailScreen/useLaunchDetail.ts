import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Badge } from '../../components/Badge';
import { useFavorites } from '../../hooks/useFavorites';
import { fetchLaunchById, fetchLaunchpadById } from '../../api/spacex';
import type { Launch, Launchpad } from '../../api/types';
import type { RootStackParamList } from '../../@types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'LaunchDetail'>;

export function useLaunchDetail() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [launch, setLaunch] = useState<Launch | null>(null);
  const [launchpad, setLaunchpad] = useState<Launchpad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaunchById(params.launchId)
      .then(async (data) => {
        setLaunch(data);
        if (data.launchpad) {
          const pad = await fetchLaunchpadById(data.launchpad).catch(() => null);
          setLaunchpad(pad);
        }
      })
      .finally(() => setLoading(false));
  }, [params.launchId]);

  const variant = launch ? Badge.getLaunchVariant(launch.success, launch.upcoming) : 'upcoming';
  const favorited = launch ? isFavorite(launch.id) : false;

  return { navigation, launch, launchpad, loading, variant, favorited, toggleFavorite };
}
