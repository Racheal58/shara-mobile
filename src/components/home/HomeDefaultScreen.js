import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import globalStyles from '../../assets/styles/base/global';
import homeStyles from '../../assets/styles/components/home';
import modalStyles from '../../assets/styles/components/modal';

import {
  getProducts,
  addProductToOrder,
  getUserOrder,
} from '../../stores/modules/products';

import { truncateString } from '../../utils/helpers';

class HomeDefaultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      modalVisible: false,
      quantity: 0,
      productToBeAddedToCart: {},
      disabled: true,
    };
  }

  componentDidMount = async () => {
    await this.props.getProducts();
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

  onRefresh = async () => {
    this.setState(previousState => ({
      ...previousState,
      refreshing: true,
    }));
    try {
      await this.props.getProducts();
      await this.props.getUserOrder();
      this.setState(previousState => ({
        ...previousState,
        refreshing: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  addProductToCart = async () => {
    const { quantity, productToBeAddedToCart } = this.state;
    await this.props.addProductToOrder(
      {
        ...productToBeAddedToCart,
        quantity: quantity === 0 ? 1 : quantity,
      },
      this.props.orders,
    );
    await this.setState({ quantity: 1, disabled: true, modalVisible: false });
  };

  handleInputChange = (type, value) => {
    this.setState({ [type]: value, disabled: false });
  };

  render() {
    const { refreshing, modalVisible, quantity, disabled } = this.state;
    const { navigation, products, cartLength, isLoading } = this.props;

    return (
      <View style={homeStyles.homeScreen}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={modalStyles.cancelButton}
                  onPress={() => {
                    this.setState({ modalVisible: !modalVisible });
                  }}
                >
                  <Text style={modalStyles.cancelText}>X</Text>
                </TouchableOpacity>
              </View>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Text style={modalStyles.modalText}>
                    How many do you want to buy ?
                  </Text>
                  <TextInput
                    style={modalStyles.textInput}
                    value={quantity.toString()}
                    autoCompleteType="name"
                    keyboardType={'numeric'}
                    onChangeText={text =>
                      this.handleInputChange('quantity', text)
                    }
                  />

                  <TouchableOpacity
                    style={{
                      ...modalStyles.openButton,
                      backgroundColor: disabled ? '#c4c4c4' : '#023047',
                    }}
                    onPress={() => this.addProductToCart()}
                    disabled={disabled}
                  >
                    <Text style={modalStyles.textStyle}>Add to Cart</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        <SafeAreaView style={{ flex: 1 }}>
          <View style={globalStyles.container}>
            <View style={homeStyles.productContainer}>
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
              {isLoading && <ActivityIndicator />}
              <View style={homeStyles.cardContainer}>
                {products.length > 0 &&
                  products.map(product => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('HomeScreens', {
                          screen: 'SingleProductScreen',
                          params: {
                            data: {
                              product,
                            },
                          },
                        })
                      }
                      style={homeStyles.card}
                      key={product._id}
                    >
                      <Image
                        source={{ uri: product.imageUrl }}
                        style={homeStyles.cardImage}
                      />
                      <View style={homeStyles.cardBody}>
                        <Text style={homeStyles.productName}>
                          {truncateString(product.name, 25)}
                        </Text>
                        <Text style={homeStyles.productDescription}>
                          {product.description}
                        </Text>
                        <Text style={homeStyles.productPrice}>
                          &#8358; {parseInt(product.price).toLocaleString()}
                        </Text>

                        <TouchableOpacity
                          style={homeStyles.addToCartButton}
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              productToBeAddedToCart: product,
                            })
                          }
                        >
                          <Text style={homeStyles.addToCartButtonText}>
                            Add to Cart
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = ({
  product: { isLoading, products, cartLength, orders },
}) => ({
  isLoading,
  products,
  cartLength,
  orders,
});

export default connect(
  mapStateToProps,
  { getProducts, addProductToOrder, getUserOrder },
)(HomeDefaultScreen);
