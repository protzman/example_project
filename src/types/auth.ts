export interface SignInRequest {
  user_id: string;
  password: string;
}

export interface SignInSuccess {
  user_id: string;
  token?: string;
}

export enum AuthActionTypes {
  SIGN_IN_REQUEST = 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_OUT = 'SIGN_OUT',
}

export interface AuthenticationAction {
  type: AuthActionTypes;
  user_id: string;
  authorized: boolean;
  token: string;
}

export type AuthenticationActions = AuthenticationAction;
