import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { fetchRocketById } from '../../api/spacex';
import type { Rocket } from '../../api/types';
import type { RootStackParamList } from '../../@types/navigation';

type Route = RouteProp<RootStackParamList, 'RocketDetail'>;

export function useRocketDetail() {
  const { params } = useRoute<Route>();
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRocketById(params.rocketId)
      .then(setRocket)
      .finally(() => setLoading(false));
  }, [params.rocketId]);

  return { rocket, loading };
}
