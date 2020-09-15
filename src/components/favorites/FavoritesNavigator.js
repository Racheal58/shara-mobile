import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavoritesHomeScreen from './FavoritesHomeScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="FavoritesBase"
    mode="modal"
    headerMode="none"
  >
    <Stack.Screen name="Favorites" component={FavoritesHomeScreen} />
  </Stack.Navigator>
);
