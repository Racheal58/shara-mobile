import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import Toast, { DURATION } from 'react-native-easy-toast';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faUser,
  faCircleNotch,
  faSignOutAlt,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import globalStyles from '../../assets/styles/base/global';
import placeholders from '../../assets/styles/base/placeholders';
import homeStyles from '../../assets/styles/components/home';

import { getOrders, getUserOrder } from '../../stores/modules/products';
import { logout } from '../../stores/modules/auth';

import { truncateString } from '../../utils/helpers';

class ProfileHomeScreen extends React.Component {
  state = {
    user: {},
    refreshing: false,
  };
  componentDidMount = async () => {
    this.setState({
      user: JSON.parse(await AsyncStorage.getItem('user')),
    });
    await this.props.getOrders();
  };

  onRefresh = async () => {
    this.setState(previousState => ({
      ...previousState,
      refreshing: true,
    }));
    try {
      await this.props.getOrders();
      this.setState(previousState => ({
        ...previousState,
        refreshing: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  handleTotalPrice = products =>
    products.reduce((a, b) => a + Number(b.price * b.quantity), 0);

  handleLogout = () => {
    this.props.logout(this.props.navigation);
  };
  render() {
    const { orders, isLoading, navigation } = this.props;
    const { user, refreshing } = this.state;

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
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
            style={globalStyles.container}
          >
            <View style={homeStyles.itemCardContainer}>
              <View style={homeStyles.itemCard}>
                <View style={homeStyles.userIcon}>
                  <FontAwesomeIcon icon={faUser} color={'#023047'} size={45} />
                </View>
                {Object.keys(user).length > 0 && (
                  <View style={homeStyles.textSection}>
                    <Text
                      style={[
                        homeStyles.singleProductName,
                        {
                          marginTop: 20,
                          marginBottom: 10,
                          fontSize: 18,
                          lineHeight: 20,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {Object.keys(user).length > 0 &&
                        user.first_name.charAt(0).toUpperCase()}
                      {'. '}
                      {truncateString(
                        `${user.last_name.replace(
                          user.last_name[0],
                          user.last_name[0].toUpperCase(),
                        )}`,
                        10,
                      )}
                    </Text>
                    <Text
                      style={{
                        ...homeStyles.singleProductDescription,
                        fontSize: 12,
                      }}
                    >
                      {user.email}
                    </Text>
                    <Text
                      style={[
                        homeStyles.singleProductDescription,
                        { marginTop: 5, fontSize: 12 },
                      ]}
                    >
                      {user.phone_number}
                    </Text>
                  </View>
                )}
                <View style={homeStyles.signOutContainer}>
                  <TouchableOpacity
                    onPress={() => this.handleLogout()}
                    style={homeStyles.signOutButton}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      color={'red'}
                      size={20}
                    />
                  </TouchableOpacity>
                  <Text>Log Out</Text>
                </View>
              </View>
            </View>

            <Text>Your Orders</Text>
            <ScrollView
              style={homeStyles.cartScreen}
              showsVerticalScrollIndicator={false}
            >
              {isLoading && <ActivityIndicator />}
              {orders.length > 0 &&
                orders.map(order => (
                  <TouchableOpacity
                    style={[
                      homeStyles.itemCardContainer,
                      { padding: 0, display: 'flex', flexDirection: 'column' },
                    ]}
                    key={order._id}
                    onPress={async () => {
                      await navigation.navigate('ProfileScreens', {
                        screen: 'OrderScreen',
                        params: { data: { order, completed: true } },
                      });
                    }}
                  >
                    <View style={homeStyles.orderIcons}>
                      {order.isCompleted ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          color={'green'}
                          size={20}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircleNotch}
                          color={'orange'}
                          size={20}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        ...homeStyles.itemCard,
                        marginTop: 15,
                        padding: 0,
                      }}
                    >
                      <View style={homeStyles.textSection}>
                        <Text style={homeStyles.cartProductName}>
                          Order ID:{' '}
                          <Text style={{ color: '#14acf2' }}>{order._id}</Text>
                        </Text>
                        <Text style={homeStyles.cartProductPrice}>
                          Order Date:{' '}
                          <Text style={{ color: '#b39d2d' }}>
                            {moment(order.created_at).format(
                              'ddd, DD MMM YYYY',
                            )}
                          </Text>
                        </Text>
                        <Text style={homeStyles.cartProductPrice}>
                          No of items: {order.products.length}
                        </Text>
                        <Text style={homeStyles.cartProductPrice}>
                          Total Price:{' '}
                          <Text style={{ color: 'green' }}>
                            &#8358;
                            {parseInt(
                              this.handleTotalPrice(order.products),
                            ).toLocaleString()}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = ({ product: { isLoading, orders } }) => ({
  orders,
  isLoading,
});

export default connect(
  mapStateToProps,
  { getOrders, getUserOrder, logout },
)(ProfileHomeScreen);
