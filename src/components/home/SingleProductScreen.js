import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../assets/styles/base/global';
import homeStyles from '../../assets/styles/components/home';

class SingleProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      navigation,
      route: {
        params: {
          data: { product },
        },
      },
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={globalStyles.container}>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 90 }}
              >
                <View
                  style={{
                    color: '#303030',
                    fontFamily: 'Poppins-semi-bold',
                    fontSize: 14,
                    height: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#303030',
                      fontFamily: 'Poppins-semi-bold',
                      fontSize: 30,
                    }}
                  >
                    {'< '}
                  </Text>
                  <Text
                    style={{
                      color: '#303030',
                      fontFamily: 'Poppins-semi-bold',
                      fontSize: 20,
                    }}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                behavior="position"
                enabled
                style={{
                  paddingBottom: 150,
                }}
              >
                <Image
                  source={{ uri: product.imageUrl }}
                  style={homeStyles.singleProductImage}
                />
                <Text style={homeStyles.singleProductName}>{product.name}</Text>
                <Text style={homeStyles.singleProductDescription}>
                  {product.description}
                </Text>
                <Text style={homeStyles.singleProductPrice}>
                  &#8358;{product.price}
                </Text>
                <View style={homeStyles.inputGroup}>
                  <Text style={homeStyles.qunatityInputLabel}>Quantity:</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={this.state.myNumber}
                    maxLength={10}
                    style={homeStyles.qunatityInput}
                  />
                </View>

                <TouchableOpacity
                  style={homeStyles.singleProductAddToCartButton}
                >
                  <Text style={homeStyles.singleProductAddToCartButtonText}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  null,
  {},
)(SingleProductScreen);
