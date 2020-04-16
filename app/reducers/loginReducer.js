/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  id: null,
  username: '',
  password: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      username: action.username,
      password: action.password,
    };
  },
  [types.LOGIN_LOADING_ENDED](state) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      id: action.userToken,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
    };
  },
  [types.LOGOUT](state) {
    return {
      ...state,
      username: '',
      password: '',
      id: null,
    };
  },
});
