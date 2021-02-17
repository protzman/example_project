import { Reducer } from 'redux';
import { AuthenticationActions, AuthActionTypes } from '../actions/auth';

export interface AuthState {
  authorized: boolean;
  token: string;
  user_id: string;
}

const initialLoginState: AuthState = {
  authorized: false,
  token: '',
  user_id: '',
};

export const authReducer: Reducer<AuthState, AuthenticationActions> = (
  state = initialLoginState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        authorized: action.authorized,
        user_id: action.user_id,
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        authorized: true,
        user_id: action.user_id,
        token: action.token,
      };
    case AuthActionTypes.SIGN_OUT:
      return {
        ...state,
        authorized: action.authorized,
        user_id: action.user_id,
      };
    default:
      return state;
  }
};
