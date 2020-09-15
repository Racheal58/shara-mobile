import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../assets/styles/base/global';
import authStyles from '../../assets/styles/components/auth';

//actions
import { login } from '../../stores/modules/auth';

class LoginScreen extends React.Component {
  handleLogin = async () => {
    console.log(';logged in?', this.props.loggedIn);
    await this.props.login();

    // navigation.navigate('Registration')
  };

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
                <View style={authStyles.loginContainer}>
                  <Text style={authStyles.title}>Log In</Text>
                  <Text style={authStyles.subText}>
                    Welcome back, Please log in to your account
                  </Text>

                  <TextInput
                    placeholder="Email address"
                    style={authStyles.textInput}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="password"
                    style={authStyles.textInput}
                  />
                  <TouchableOpacity
                    onPress={() => this.handleLogin()}
                    style={authStyles.registrationBtn}
                  >
                    <Text style={authStyles.buttonText}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Registration')}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 12,
                    }}
                  >
                    <Text>Don't have an account? </Text>
                    <Text>Sign Up</Text>
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

const mapStateToProps = ({ auth: { loggedIn } }) => ({
  loggedIn,
});

export default connect(
  mapStateToProps,
  { login },
)(LoginScreen);
