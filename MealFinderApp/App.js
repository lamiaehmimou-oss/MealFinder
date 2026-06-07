import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import MealsScreen from './screens/MealsScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#D85A30',
          headerTitleStyle: { fontWeight: '700', color: '#1a1a1a' },
          contentStyle: { backgroundColor: '#f5f5f0' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '🍽️ MealFinder' }}
        />
        <Stack.Screen
          name="Meals"
          component={MealsScreen}
          options={{ title: 'Plats' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Recette' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
