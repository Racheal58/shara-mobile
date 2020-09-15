import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfilesNavigator from '../profile/ProfileNavigator';
import HomeDefaultScreen from '../home/HomeDefaultScreen';

import appStyles from '../../assets/styles/components/app';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#211A4C',
      keyboardHidesTabBar: true,
      tabStyle: {
        backgroundColor: '#FBFBFB',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeDefaultScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../../assets/images/icons/home-active.png')
                : require('../../assets/images/icons/home.png')
            }
            style={appStyles.bottomNavIcon}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilesNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../../assets/images/icons/profile-active.png')
                : require('../../assets/images/icons/profile.png')
            }
            style={appStyles.bottomNavIcon}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
