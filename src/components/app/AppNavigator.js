import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import LoginNavigator from '../auth/LoginNavigator';
import HomeNavigator from '../home/HomeNavigator';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!this.props.loggedIn && (
            <Stack.Screen name="Auth" component={LoginNavigator} />
          )}
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="HomeScreens" component={HomeNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({ auth: { loggedIn } }) => ({
  loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(AppNavigator);
