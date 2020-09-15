import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Registration" headerMode="none">
    <Stack.Screen name="Registration" component={RegistrationScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
