import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../assets/styles/base/global';
import authStyles from '../../assets/styles/components/auth';

//actions
import { login } from '../../stores/modules/auth';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };
  handleLogin = async () => {
    const { email, password } = this.state;

    this.setState({ disabled: true });
    await this.props.login({ email, password });
    await this.setState({ password: '' });
  };

  handleInputChange = (type, value) => {
    const { email, password } = this.state;
    this.setState({ [type]: value.toLowerCase(), disabled: true });
    if (email !== '' && password !== '') {
      this.setState({ disabled: false });
    }

    if (type === 'email') {
      if (password === '' || value === '') {
        this.setState({ disabled: true });
      }
    }

    if (type === 'password') {
      if (email === '' || value === '') {
        this.setState({ disabled: true });
      }
    }
  };

  render() {
    const { navigation, isLoading } = this.props;
    const { email, password, disabled } = this.state;
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
                  <View style={{ width: '100%' }}>
                    {isLoading && (
                      <View style={authStyles.loadingContainer}>
                        <ActivityIndicator />
                      </View>
                    )}
                    <TextInput
                      placeholder="Email address"
                      style={authStyles.textInput}
                      value={email}
                      onChangeText={text =>
                        this.handleInputChange('email', text)
                      }
                      autoCompleteType="email"
                      keyboardType="email-address"
                    />
                    <TextInput
                      secureTextEntry
                      placeholder="password"
                      style={authStyles.textInput}
                      value={password}
                      onChangeText={text =>
                        this.handleInputChange('password', text)
                      }
                      autoCompleteType="password"
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => this.handleLogin()}
                    style={[
                      authStyles.registrationBtn,
                      { backgroundColor: disabled ? '#c4c4c4' : '#023047' },
                    ]}
                    disabled={disabled}
                  >
                    <Text
                      style={[
                        authStyles.buttonText,
                        { color: disabled ? '#303030' : '#FFFFFF' },
                      ]}
                    >
                      Submit
                    </Text>
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

const mapStateToProps = ({ auth: { isLoading } }) => ({
  isLoading,
});

export default connect(
  mapStateToProps,
  { login },
)(LoginScreen);
