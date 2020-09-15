import { combineReducers } from 'redux';

// reducers
import { productsReducer } from './modules/products';
import { authReducer } from './modules/auth';

export default combineReducers({
  product: productsReducer,
  auth: authReducer,
});
