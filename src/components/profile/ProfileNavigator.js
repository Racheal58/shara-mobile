import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrderScreen from './OrderScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="OrderScreen"
    mode="modal"
    headerMode="none"
  >
    <Stack.Screen name="OrderScreen" component={OrderScreen} />
  </Stack.Navigator>
);
