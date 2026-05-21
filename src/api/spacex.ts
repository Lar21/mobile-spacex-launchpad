import axios from 'axios';
import type { Launch, Rocket, Launchpad } from './types';

const v5 = axios.create({
  baseURL: 'https://api.spacexdata.com/v5',
  timeout: 10000,
});

const v4 = axios.create({
  baseURL: 'https://api.spacexdata.com/v4',
  timeout: 10000,
});

export async function fetchLaunches(): Promise<Launch[]> {
  if (process.env.EXPO_PUBLIC_FORCE_ERROR === 'true') {
    throw new Error('Erro simulado para testes');
  }
  const { data } = await v5.get<Launch[]>('/launches');
  return data;
}

export async function fetchLaunchById(id: string): Promise<Launch> {
  const { data } = await v5.get<Launch>(`/launches/${id}`);
  return data;
}

export async function fetchRocketById(id: string): Promise<Rocket> {
  const { data } = await v4.get<Rocket>(`/rockets/${id}`);
  return data;
}

export async function fetchLaunchpadById(id: string): Promise<Launchpad> {
  const { data } = await v4.get<Launchpad>(`/launchpads/${id}`);
  return data;
}
