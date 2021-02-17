import { Dispatch } from 'redux';
import { SignInRequest, SignInSuccess } from '../../utils/types';

export enum AuthActionTypes {
  SIGN_IN_REQUEST = 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_OUT = 'SIGN_OUT',
}

interface AuthenticationAction {
  type: AuthActionTypes;
  user_id: string;
  authorized: boolean;
  token: string;
}

export const signInRequest = (creds: SignInRequest) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.SIGN_IN_REQUEST,
      username: creds.user_id,
      password: creds.password,
    });
  };
};

export const signInSuccess = (creds: SignInSuccess) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.SIGN_IN_SUCCESS,
      user_id: creds.user_id,
      token: creds.token,
    });
  };
};
export const signOut = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.SIGN_OUT,
      user_id: '',
      authorized: false,
    });
  };
};

export type AuthenticationActions = AuthenticationAction;
