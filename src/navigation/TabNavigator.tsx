import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { LaunchListScreen } from '../screens/LaunchListScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { TEST_IDS } from '../utils/testIds';
import type { TabParamList } from '../@types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Launches"
        component={LaunchListScreen}
        options={{
          title: 'Lançamentos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              testID={TEST_IDS.TAB_LAUNCHES}
              accessibilityLabel={TEST_IDS.TAB_LAUNCHES}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              testID={TEST_IDS.TAB_FAVORITES}
              accessibilityLabel={TEST_IDS.TAB_FAVORITES}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
