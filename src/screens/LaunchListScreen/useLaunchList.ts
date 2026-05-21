import { useState } from 'react';
import { useLaunches } from '../../hooks/useLaunches';

export function useLaunchList() {
  const launchesData = useLaunches();
  const [filterVisible, setFilterVisible] = useState(false);
  return { ...launchesData, filterVisible, setFilterVisible };
}
