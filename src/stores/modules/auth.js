const DEFAULT_STATE = {
  error: {},
  isLoading: false,
  status: undefined,
  loggedIn: false,
};

export const login = () => async dispatch => {
  await dispatch({ type: 'LOGIN' });
};

export const authReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
};
