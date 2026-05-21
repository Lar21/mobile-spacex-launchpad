import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@spacex_favorites';

export async function getFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
