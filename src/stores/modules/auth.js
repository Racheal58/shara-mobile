import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';

import { authenticationRequest, registrationRequest } from '../../api/auth';
import { errorHandler } from '../../utils/helpers';
import { http } from '../../api/client';

const ACTION_PROCCESS = 'ACTION_PROCCESS';
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
const ACTION_ERROR = 'ACTION_ERROR';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const login = userObj => async dispatch => {
  try {
    await dispatch({ type: ACTION_PROCCESS });
    const {
      data: { token, user },
    } = await authenticationRequest(userObj);
    await AsyncStorage.setItem('token', token);
    http.defaults.headers.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: AUTHENTICATION_SUCCESS, payload: user });
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: ACTION_ERROR, payload: err });
  }
};

export const register = userObj => async dispatch => {
  try {
    await dispatch({ type: ACTION_PROCCESS });
    const {
      data: { token, user },
    } = await registrationRequest(userObj);
    await AsyncStorage.setItem('token', token);
    http.defaults.headers.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: AUTHENTICATION_SUCCESS, payload: user });
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: ACTION_ERROR, payload: err });
  }
};

export const logout = navigation => async dispatch => {
  try {
    await dispatch({ type: ACTION_PROCCESS });
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await dispatch({ type: LOGOUT_SUCCESS });
    await navigation.replace('Auth', {
      screen: 'Login',
    });
  } catch (error) {
    const err = errorHandler(error);
    Alert.alert(err);
    dispatch({ type: ACTION_ERROR, payload: err });
  }
};

const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  status: undefined,
  loggedIn: false,
  user: {},
};

export const authReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_PROCCESS:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        status: 'success',
        user: { ...payload },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
      };
    case ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        status: 'error',
        error: payload,
      };
    default:
      return state;
  }
};
