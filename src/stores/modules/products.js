import { Alert } from 'react-native';

import {
  getProductsRequest,
  addProductToOrderRequest,
  removeProductFromOrderRequest,
  editProductQuantityRequest,
  completeUserOrderRequest,
} from '../../api/products';
import { getUserOrderRequest, getAllOrdersRequest } from '../../api/order';
import { errorHandler } from '../../utils/helpers';

const REQUEST_PROCCESS = 'REQUEST_PROCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const ADD_PRODUCT_TO_ORDER_SUCCESS = 'ADD_PRODUCT_TO_ORDER_SUCCESS';
const GET_USER_ORDER_SUCCESS = 'GET_USER_ORDER_SUCCESS';
const REMOVE_PRODUCT_FROM_ORDER_SUCCESS = 'REMOVE_PRODUCT_FROM_ORDER_SUCCESS';
const EDIT_PRODUCT_QUANTITY_SUCCESS = 'EDIT_PRODUCT_QUANTITY_SUCCESS';
const COMPLETE_USER_ORDER_SUCCESS = 'COMPLETE_USER_ORDER_SUCCESS';
const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';

export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { products },
    } = await getProductsRequest();
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: REQUEST_ERROR, payload: err });
  }
};

export const addProductToOrder = product => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { order },
    } = await addProductToOrderRequest(product);
    Alert.alert('Item successfully added to cart');
    dispatch({ type: ADD_PRODUCT_TO_ORDER_SUCCESS, payload: order });
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: REQUEST_ERROR, payload: err });
  }
};

export const getUserOrder = userOrder => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    if (userOrder) {
      return dispatch({ type: GET_USER_ORDER_SUCCESS, payload: userOrder });
    }
    const {
      data: { order },
    } = await getUserOrderRequest();
    dispatch({ type: GET_USER_ORDER_SUCCESS, payload: order });
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: error });
  }
};

export const removeProductFromOrder = (
  orderId,
  productId,
) => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { order },
    } = await removeProductFromOrderRequest(orderId, productId);
    dispatch({ type: REMOVE_PRODUCT_FROM_ORDER_SUCCESS, payload: order });
    Alert.alert('Product has been successfully removed from order');
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: REQUEST_ERROR, payload: err });
  }
};

export const editProductQuantity = (
  orderId,
  productId,
  quantity,
) => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { order },
    } = await editProductQuantityRequest(orderId, productId, quantity);
    dispatch({ type: EDIT_PRODUCT_QUANTITY_SUCCESS, payload: order });
    Alert.alert('Product Quantity has been successfully edited');
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: REQUEST_ERROR, payload: err });
  }
};

export const completeUserOrder = orderId => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { order },
    } = await completeUserOrderRequest(orderId);
    dispatch({ type: COMPLETE_USER_ORDER_SUCCESS, payload: order });
    Alert.alert('Your order has been successfully completed');
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: REQUEST_ERROR, payload: err });
  }
};

export const getOrders = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { orders },
    } = await getAllOrdersRequest();
    dispatch({ type: GET_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    console.log(error);
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: REQUEST_ERROR, payload: err });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  products: [],
  order: {},
  orders: [],
  userOrder: {},
  cartLength: 0,
};

export const productsReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_PROCCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    case ADD_PRODUCT_TO_ORDER_SUCCESS:
    case COMPLETE_USER_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: payload,
        cartLength: payload.products.length,
      };
    case GET_USER_ORDER_SUCCESS:
    case REMOVE_PRODUCT_FROM_ORDER_SUCCESS:
    case EDIT_PRODUCT_QUANTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userOrder: payload,
        cartLength: payload.products.length,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        status: 'error',
        error: payload,
      };
    default:
      return state;
  }
};
