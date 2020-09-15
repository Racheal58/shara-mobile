import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingleProductScreen from './SingleProductScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="SingleProductScreen" headerMode="none">
    <Stack.Screen name="SingleProductScreen" component={SingleProductScreen} />
  </Stack.Navigator>
);
