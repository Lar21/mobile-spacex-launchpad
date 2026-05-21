export const TEST_IDS = {
  // Tab navigation
  TAB_LAUNCHES: 'tab-launches',
  TAB_FAVORITES: 'tab-favorites',

  // LaunchListScreen
  LAUNCH_LIST_SCREEN: 'launch-list-screen',
  LAUNCH_SEARCH_INPUT: 'launch-search-input',
  LAUNCH_FILTER_BUTTON: 'launch-filter-button',
  LAUNCH_FILTER_MODAL: 'launch-filter-modal',
  LAUNCH_FILTER_STATUS_ALL: 'launch-filter-status-all',
  LAUNCH_FILTER_STATUS_SUCCESS: 'launch-filter-status-success',
  LAUNCH_FILTER_STATUS_FAILURE: 'launch-filter-status-failure',
  LAUNCH_FILTER_STATUS_UPCOMING: 'launch-filter-status-upcoming',
  LAUNCH_FILTER_APPLY: 'launch-filter-apply-button',
  LAUNCH_FILTER_CLEAR: 'launch-filter-clear-button',
  LAUNCH_LIST: 'launch-list',
  LAUNCH_LIST_ITEM: (id: string) => `launch-list-item-${id}`,
  LAUNCH_ITEM_NAME: (id: string) => `launch-item-name-${id}`,
  LAUNCH_ITEM_DATE: (id: string) => `launch-item-date-${id}`,
  LAUNCH_ITEM_BADGE: (id: string) => `launch-item-badge-${id}`,
  LAUNCH_LOADING: 'launch-list-loading',
  LAUNCH_ERROR_MESSAGE: 'launch-list-error-message',
  LAUNCH_RETRY_BUTTON: 'launch-list-retry-button',
  LAUNCH_EMPTY_MESSAGE: 'launch-list-empty-message',

  // LaunchDetailScreen
  LAUNCH_DETAIL_SCREEN: 'launch-detail-screen',
  LAUNCH_DETAIL_PATCH: 'launch-detail-patch-image',
  LAUNCH_DETAIL_NAME: 'launch-detail-name',
  LAUNCH_DETAIL_DATE: 'launch-detail-date',
  LAUNCH_DETAIL_SITE: 'launch-detail-site',
  LAUNCH_DETAIL_BADGE: 'launch-detail-status-badge',
  LAUNCH_DETAIL_DETAILS: 'launch-detail-details-text',
  LAUNCH_DETAIL_FAVORITE_BUTTON: 'launch-detail-favorite-button',
  LAUNCH_DETAIL_FAVORITE_ACTIVE: 'launch-detail-favorite-active',
  LAUNCH_DETAIL_ROCKET_LINK: 'launch-detail-rocket-link',

  // RocketDetailScreen
  ROCKET_DETAIL_SCREEN: 'rocket-detail-screen',
  ROCKET_DETAIL_NAME: 'rocket-detail-name',
  ROCKET_DETAIL_DESCRIPTION: 'rocket-detail-description',
  ROCKET_DETAIL_ACTIVE_BADGE: 'rocket-detail-active-badge',
  ROCKET_DETAIL_SUCCESS_RATE: 'rocket-detail-success-rate',
  ROCKET_DETAIL_FIRST_FLIGHT: 'rocket-detail-first-flight',
  ROCKET_DETAIL_HEIGHT: 'rocket-detail-stat-height',
  ROCKET_DETAIL_MASS: 'rocket-detail-stat-mass',

  // FavoritesScreen
  FAVORITES_SCREEN: 'favorites-screen',
  FAVORITES_LIST: 'favorites-list',
  FAVORITES_ITEM: (id: string) => `favorites-item-${id}`,
  FAVORITES_ITEM_NAME: (id: string) => `favorites-item-name-${id}`,
  FAVORITES_EMPTY_MESSAGE: 'favorites-empty-message',
  FAVORITES_REMOVE_BUTTON: (id: string) => `favorites-remove-button-${id}`,

} as const;
