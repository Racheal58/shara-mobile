import { getProductsRequest } from '../../api/products';

const REQUEST_PROCCESS = 'REQUEST_PROCCESS';
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCCESS });
    const {
      data: { products },
    } = await getProductsRequest();
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: error });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  products: [],
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
