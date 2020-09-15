import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../assets/styles/base/global';
import homeStyles from '../../assets/styles/components/home';

import { getProducts } from '../../stores/modules/products';

import { truncateString } from '../../utils/helpers';

class HomeDefaultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount = () => {
    this.props.getProducts();
  };

  onRefresh = async () => {
    this.setState(previousState => ({
      ...previousState,
      refreshing: true,
    }));
    try {
      await this.props.getProducts();
      this.setState(previousState => ({
        ...previousState,
        refreshing: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { refreshing } = this.state;
    const { navigation, products } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={globalStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
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
                          &#8358; {product.price}
                        </Text>

                        <TouchableOpacity style={homeStyles.addToCartButton}>
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

const mapStateToProps = ({ product: { products } }) => ({
  products,
});

export default connect(
  mapStateToProps,
  { getProducts },
)(HomeDefaultScreen);
