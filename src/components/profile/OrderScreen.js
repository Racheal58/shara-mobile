import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import globalStyles from '../../assets/styles/base/global';
import homeStyles from '../../assets/styles/components/home';
import modalStyles from '../../assets/styles/components/modal';

import {
  getUserOrder,
  removeProductFromOrder,
  editProductQuantity,
  completeUserOrder,
} from '../../stores/modules/products';

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      isCompleteButtonDisabled: false,
      quantity: 0,
      modalVisible: false,
      editProductId: 0,
    };
  }
  componentDidMount = async () => {
    const {
      props: {
        route: {
          params: {
            data: { order, from },
          },
        },
      },
    } = this;
    if (from === 'profile') {
      await this.props.getUserOrder(order);
    } else {
      await this.props.getUserOrder();
    }
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

  handleProductRemoval = async productId => {
    this.props.removeProductFromOrder(this.props.userOrder._id, productId);
  };

  handleEditQuantity = async () => {
    await this.props.editProductQuantity(
      this.props.userOrder._id,
      this.state.editProductId,
      this.state.quantity,
    );
    await this.setState(previousState => ({
      ...previousState,
      modalVisible: false,
      quantity: 0,
    }));
  };

  handleCompleteUserOrder = async () => {
    await this.setState(previousState => ({
      ...previousState,
      isCompleteButtonDisabled: true,
    }));
    await this.props.completeUserOrder(this.props.userOrder._id);
    this.props.navigation.navigate('Main', {
      screen: 'Profile',
    });
  };

  render() {
    const { navigation, cartLength, isLoading, userOrder } = this.props;
    const {
      disabled,
      quantity,
      modalVisible,
      isCompleteButtonDisabled,
    } = this.state;

    return (
      <View style={homeStyles.cartContainer}>
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
              <View style={modalStyles.modalHeader}>
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
                    value={quantity}
                    autoCompleteType="name"
                    keyboardType="number-pad"
                    onChangeText={text =>
                      this.handleInputChange('quantity', text)
                    }
                  />

                  <TouchableOpacity
                    style={{
                      ...modalStyles.openButton,
                      backgroundColor: disabled ? '#c4c4c4' : '#023047',
                    }}
                    onPress={() => this.handleEditQuantity()}
                    disabled={disabled}
                  >
                    <Text style={modalStyles.textStyle}>Edit Quantity</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
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

              <TouchableOpacity disabled={true} style={homeStyles.cartButton}>
                <FontAwesomeIcon icon={faBoxOpen} color={'#023047'} size={50} />
                <Text style={homeStyles.cartLength}>{cartLength}</Text>
              </TouchableOpacity>
            </View>

            <Text>Your Order</Text>
            <ScrollView
              style={homeStyles.cartScreen}
              showsVerticalScrollIndicator={false}
            >
              {isLoading && <ActivityIndicator />}
              {Object.keys(userOrder).length > 0 &&
                userOrder.products.map((item, index) => (
                  <View style={homeStyles.itemCardContainer} key={item._id}>
                    <View style={homeStyles.itemCard}>
                      <View>
                        <Image
                          source={{ uri: item.imageUrl }}
                          style={homeStyles.imageStyle}
                        />
                      </View>
                      <View style={homeStyles.textSection}>
                        <Text style={homeStyles.cartProductName}>
                          {item.name}
                        </Text>
                        {userOrder.isCompleted && (
                          <Text style={homeStyles.productPrice}>
                            x{item.quantity}
                          </Text>
                        )}
                        <Text
                          style={[
                            homeStyles.cartProductPrice,
                            { color: 'green' },
                          ]}
                        >
                          &#8358;{parseInt(item.price).toLocaleString()}{' '}
                          <Text style={{ color: '#c4c4c4', fontSize: 10 }}>
                            each
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={homeStyles.editAndDeleteCardSection}>
                      {!userOrder.isCompleted ? (
                        <>
                          <View style={homeStyles.editButtonSection}>
                            <TouchableOpacity
                              style={homeStyles.editButton}
                              onPress={() => {
                                this.setState({
                                  modalVisible: !modalVisible,
                                  editProductId: item._id,
                                });
                              }}
                            >
                              <View style={homeStyles.editButtonIconSection}>
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  color={'#023047'}
                                  size={16}
                                />
                              </View>
                              <Text style={{ marginLeft: 10 }}>
                                {item.quantity}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={homeStyles.deleteButtonSection}>
                            <TouchableOpacity
                              style={homeStyles.deleteButton}
                              onPress={() =>
                                this.handleProductRemoval(item._id)
                              }
                            >
                              <Image
                                source={require('../../assets/images/icons/error.png')}
                                style={{ width: 30, height: 30 }}
                              />
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : (
                        <View style={homeStyles.completedOrderPriceView}>
                          <Text style={homeStyles.completedOrderPrice}>
                            &#8358;{' '}
                            {Number(item.price.toLocaleString()) *
                              Number(item.quantity)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
            </ScrollView>
            {Object.keys(userOrder).length > 0 && !userOrder.isCompleted && (
              <View>
                <TouchableOpacity
                  onPress={() => this.handleCompleteUserOrder()}
                  style={{
                    ...homeStyles.completeOrder,
                    backgroundColor: isCompleteButtonDisabled
                      ? '#c4c4c4'
                      : '#023047',
                  }}
                  disabled={isCompleteButtonDisabled}
                >
                  <Text style={{ color: '#fff' }}>Complete Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = ({
  product: { isLoading, cartLength, userOrder },
}) => ({
  userOrder,
  isLoading,
  cartLength,
});
export default connect(
  mapStateToProps,
  {
    getUserOrder,
    removeProductFromOrder,
    editProductQuantity,
    completeUserOrder,
  },
)(OrderScreen);
