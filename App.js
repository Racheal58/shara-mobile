/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/stores/store';
import AppNavigator from './src/components/app/AppNavigator';
import appStyles from './src/assets/styles/components/app';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      // require('./src/assets/images/onboarding/1.png'),
      // require('./src/assets/images/onboarding/2.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'Poppins-light': require('./src/assets/fonts/Poppins-Light.ttf'),
      'Poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
      'Poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
      'Poppins-semi-bold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // eslint-disable-next-line no-console
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
    this.setLoadingComplete = this.setLoadingComplete.bind(this);
  }

  setLoadingComplete() {
    this.setState({ isLoadingComplete: true });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(this.setLoadingComplete)}
          />
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <View style={appStyles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}
