import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingleProductScreen from './SingleProductScreen';
import CartScreen from './CartScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="SingleProductScreen" headerMode="none">
    <Stack.Screen name="SingleProductScreen" component={SingleProductScreen} />
    <Stack.Screen name="CartScreen" component={CartScreen} />
  </Stack.Navigator>
);
