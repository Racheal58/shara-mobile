import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MeditationsHomeScreen from './MeditationsHomeScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="MeditationsBase"
    mode="modal"
    headerMode="none"
  >
    <Stack.Screen name="Meditations" component={MeditationsHomeScreen} />
  </Stack.Navigator>
);
