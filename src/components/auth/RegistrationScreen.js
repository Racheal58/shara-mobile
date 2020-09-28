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
  Picker,
  Platform,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
// import { Picker } from '@react-native-community/picker';
// import RNPickerSelect from 'react-native-picker-select';

import globalStyles from '../../assets/styles/base/global';
import authStyles from '../../assets/styles/components/auth';
import modalStyles from '../../assets/styles/components/modal';

//actions
import { register } from '../../stores/modules/auth';

import countries from '../../utils/countries';

class RegistrationScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    disabled: true,
    phoneMap: countries.find(country => country.code === 'NG').map,
    phoneCode: countries.find(country => country.code === 'NG').phoneCode,
    modalVisible: false,
  };

  componentDidUpdate = () => {
    const nonEmptyStateArray = [];
    for (let prop in this.state) {
      if (this.state[prop] !== '') {
        nonEmptyStateArray.push(prop);
      }
    }
    if (
      nonEmptyStateArray.length === Object.keys(this.state).length &&
      this.state.disabled === true
    ) {
      this.setState({ disabled: false });
    }
  };

  handleInputChange = (type, value) => {
    if (type === 'email') {
      return this.setState({ [type]: value.toLowerCase(), disabled: true });
    }
    this.setState({ [type]: value, disabled: true });
  };

  handleRegister = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      phoneCode,
    } = this.state;
    this.setState({ disabled: true });
    const phone_number =
      Number(phoneNumber.charAt(0)) === 0
        ? `+${phoneCode}${phoneNumber.substring(1)}`
        : `+${phoneCode}${phoneNumber}`;
    await this.props.register({
      email,
      password,
      phone_number,
      last_name: lastName,
      first_name: firstName,
    });
    await this.setState({ password: '' });
  };

  handleSelectVisibility = () => {
    this.setState(previousState => ({
      ...previousState,
      modalVisible: true,
    }));
  };
  closeModal = () => {
    this.setState(previousState => ({
      ...previousState,
      modalVisible: false,
    }));
  };

  handlePickerSelect = (item, index) => {
    this.setState({
      phoneCode: item,
      phoneMap: countries.find(country => country.phoneCode === item).map,
    });
  };

  render() {
    const { navigation, isLoading } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      disabled,
      phoneMap,
      phoneCode,
      modalVisible,
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#FBFBFB' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <TouchableOpacity
            style={modalStyles.centeredView}
            onPress={() => this.closeModal()}
          >
            <View style={modalStyles.modalView}>
              <View
                style={{
                  width: '100%',
                  opacity: 1,
                  elevation: 3,
                }}
              >
                <Picker
                  style={{
                    color: '#fff',
                    placeholderTextColor: '#fff',
                    width: '100%',
                  }}
                  selectedValue={phoneCode}
                  onValueChange={(itemValue, itemIndex) =>
                    this.handlePickerSelect(itemValue, itemIndex)
                  }
                >
                  {countries.map(country => (
                    <Picker.Item
                      label={`${country.value} (${country.map} +${country.phoneCode})`}
                      color="black"
                      value={country.phoneCode}
                      key={`${country.phoneCode} ${country.value}`}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={globalStyles.container}>
            <KeyboardAvoidingView
              behavior="padding"
              enabled
              style={{
                paddingBottom: 200,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: 80,
                  paddingBottom: 50,
                }}
              >
                <View style={authStyles.registrationContainer}>
                  <Text style={authStyles.title}>Sign Up</Text>
                  <View style={{ width: '100%' }}>
                    {isLoading && (
                      <View style={authStyles.loadingContainer}>
                        <ActivityIndicator />
                      </View>
                    )}
                    <TextInput
                      value={firstName}
                      placeholder="First Name"
                      style={authStyles.textInput}
                      autoCompleteType="name"
                      onChangeText={text =>
                        this.handleInputChange('firstName', text)
                      }
                    />
                    <TextInput
                      value={lastName}
                      placeholder="Last Name"
                      style={authStyles.textInput}
                      autoCompleteType="name"
                      onChangeText={text =>
                        this.handleInputChange('lastName', text)
                      }
                    />
                    <View
                      style={{
                        height: 44,
                        marginBottom: 30,
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      {Platform.OS === 'ios' ? (
                        <TouchableOpacity
                          style={{
                            height: '100%',
                            // borderRightWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: '#023047',
                            padding: 8,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => this.handleSelectVisibility()}
                        >
                          <Text style={{}}>
                            {phoneMap} +{phoneCode}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            backgroundColor: 'blue',
                            width: 90,
                            height: '100%',
                          }}
                        >
                          <Picker
                            style={{
                              color: '#fff',
                              placeholderTextColor: '#fff',
                              height: '100%',
                              marginTop: 30,
                            }}
                            selectedValue={this.state.choosenLabel}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({
                                choosenLabel: itemValue,
                                choosenindex: itemIndex,
                              })
                            }
                          >
                            {countries.map(country => (
                              <Picker.Item
                                label={country.map}
                                color="red"
                                value={country.phoneCode}
                                key={`${country.phoneCode} ${country.value}`}
                              />
                            ))}
                          </Picker>
                        </TouchableOpacity>
                      )}

                      <TextInput
                        value={phoneNumber}
                        placeholder="Phone Number"
                        style={{
                          ...authStyles.textInput,
                          flex: 1,
                          paddingLeft: 8,
                        }}
                        autoCompleteType="tel"
                        keyboardType="phone-pad"
                        onChangeText={text =>
                          this.handleInputChange('phoneNumber', text)
                        }
                      />
                    </View>
                    <TextInput
                      value={email}
                      placeholder="Email address"
                      style={authStyles.textInput}
                      autoCompleteType="email"
                      keyboardType="email-address"
                      onChangeText={text =>
                        this.handleInputChange('email', text)
                      }
                    />
                    <TextInput
                      value={password}
                      secureTextEntry
                      placeholder="Password"
                      style={authStyles.textInput}
                      autoCompleteType="password"
                      onChangeText={text =>
                        this.handleInputChange('password', text)
                      }
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => this.handleRegister()}
                    style={[
                      authStyles.registrationBtn,
                      { backgroundColor: disabled ? '#c4c4c4' : '#023047' },
                    ]}
                    disabled={disabled}
                  >
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
              </ScrollView>
            </KeyboardAvoidingView>
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
  { register },
)(RegistrationScreen);
