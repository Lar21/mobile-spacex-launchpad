import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { TabNavigator } from './TabNavigator';
import { LaunchDetailScreen } from '../screens/LaunchDetailScreen';
import { RocketDetailScreen } from '../screens/RocketDetailScreen';
import type { RootStackParamList } from '../@types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LaunchDetail"
          component={LaunchDetailScreen}
          options={{ title: 'Lançamento' }}
        />
        <Stack.Screen
          name="RocketDetail"
          component={RocketDetailScreen}
          options={({ route }) => ({ title: route.params.rocketName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
