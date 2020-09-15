import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import globalStyles from '../../assets/styles/base/global';
import authStyles from '../../assets/styles/components/auth';

class RegistrationScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#FBFBFB' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={globalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                behavior="position"
                enabled
                style={{
                  paddingBottom: 80,
                }}
              >
                <View style={authStyles.registrationContainer}>
                  <Text style={authStyles.title}>Sign Up</Text>
                  <TextInput
                    placeholder="First Name"
                    style={authStyles.textInput}
                  />
                  <TextInput
                    placeholder="Last Name"
                    style={authStyles.textInput}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    style={authStyles.textInput}
                  />
                  <TextInput
                    placeholder="Email address"
                    style={authStyles.textInput}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="Password"
                    style={authStyles.textInput}
                  />
                  <TouchableOpacity style={authStyles.registrationBtn}>
                    <Text style={authStyles.buttonText}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 12,
                    }}
                  >
                    <Text>Already have an account? </Text>
                    <Text>Log In</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default RegistrationScreen;
