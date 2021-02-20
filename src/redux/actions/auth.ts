import { Dispatch } from 'redux';
import { AuthActionTypes, SignInRequest, SignInSuccess } from '../../types';

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
