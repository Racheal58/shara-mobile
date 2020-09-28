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
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import globalStyles from '../../assets/styles/base/global';
import homeStyles from '../../assets/styles/components/home';

import { addProductToOrder, getUserOrder } from '../../stores/modules/products';
class SingleProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      quantity: 0,
    };
  }
  componentDidMount = async () => {
    await this.props.getUserOrder();
  };

  componentDidUpdate = () => {
    if (
      (this.state.quantity === 0 || this.state.quantity === '') &&
      this.state.disabled === false
    ) {
      this.setState({ disabled: true });
    }
  };

  handleInputChange = (type, value) => {
    this.setState({ [type]: value, disabled: false });
  };

  addProductToCart = async () => {
    const { quantity } = this.state;
    const {
      route: {
        params: {
          data: { product },
        },
      },
    } = this.props;
    await this.props.addProductToOrder({
      ...product,
      quantity: quantity === 0 ? 1 : quantity,
    });
    await this.setState({ quantity: 1, disabled: true });
  };

  render() {
    const {
      navigation,
      cartLength,
      isLoading,
      route: {
        params: {
          data: { product },
        },
      },
    } = this.props;
    const { disabled, quantity } = this.state;

    return (
      <View style={homeStyles.cartContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={globalStyles.container}>
            <View style={homeStyles.backButtonHeader}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 90 }}
              >
                <View style={homeStyles.backButton}>
                  <Text style={homeStyles.backButtonArrow}>{'< '}</Text>
                  <Text style={homeStyles.backButtonText}>Back</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeScreens', {
                    screen: 'CartScreen',
                  })
                }
                style={homeStyles.cartButton}
              >
                <FontAwesomeIcon icon={faBoxOpen} color={'#023047'} size={50} />
                <Text style={homeStyles.cartLength}>{cartLength}</Text>
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
                  &#8358;{parseInt(product.price).toLocaleString()}
                </Text>
                <View style={homeStyles.inputGroup}>
                  <Text style={homeStyles.qunatityInputLabel}>Quantity:</Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={quantity}
                    maxLength={10}
                    style={homeStyles.qunatityInput}
                    onChangeText={text =>
                      this.handleInputChange('quantity', text)
                    }
                  />
                </View>

                <TouchableOpacity
                  style={{
                    ...homeStyles.singleProductAddToCartButton,
                    backgroundColor: disabled ? '#c4c4c4' : '#023047',
                  }}
                  disabled={disabled}
                  onPress={() => this.addProductToCart()}
                >
                  <Text style={homeStyles.singleProductAddToCartButtonText}>
                    {isLoading ? <ActivityIndicator /> : 'Add to Cart'}
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

const mapStateToProps = ({ product: { isLoading, cartLength } }) => ({
  isLoading,
  cartLength,
});
export default connect(
  mapStateToProps,
  { addProductToOrder, getUserOrder },
)(SingleProductScreen);
