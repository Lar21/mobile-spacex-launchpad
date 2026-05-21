export type LaunchStatus = 'success' | 'failure' | 'upcoming';

export interface LaunchLinks {
  patch: {
    small: string | null;
    large: string | null;
  };
  webcast: string | null;
  wikipedia: string | null;
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: LaunchLinks;
  rocket: string;
  launchpad: string;
  flight_number: number;
}

export interface Rocket {
  id: string;
  name: string;
  description: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  height: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  flickr_images: string[];
}

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
}
