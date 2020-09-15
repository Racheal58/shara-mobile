import * as React from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
// eslint-disable-next-line no-unused-vars
import Toast, { DURATION } from 'react-native-easy-toast';

import globalStyles from '../../assets/styles/base/global';
import placeholders from '../../assets/styles/base/placeholders';

class ProfileHomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FBFBFB' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Toast
            position="top"
            style={{
              position: 'absolute',
              bottom: 40,
              ...placeholders.platformStyles('android', { bottom: 50 }),
            }}
            ref={refObj => {
              this.toastRef = refObj;
            }}
          />
          <ScrollView style={globalStyles.container}>
            <Text>Profile</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default ProfileHomeScreen;
