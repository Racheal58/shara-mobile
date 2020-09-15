import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileHomeScreen from './ProfileHomeScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="ProfileBase"
    mode="modal"
    headerMode="none"
  >
    <Stack.Screen name="Profile" component={ProfileHomeScreen} />
  </Stack.Navigator>
);
