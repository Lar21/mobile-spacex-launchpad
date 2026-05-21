export type RootStackParamList = {
  Main: undefined;
  LaunchDetail: { launchId: string };
  RocketDetail: { rocketId: string; rocketName: string };
};

export type TabParamList = {
  Launches: undefined;
  Favorites: undefined;
};
