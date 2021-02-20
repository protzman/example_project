export interface TokenRequest {
  user_id: string;
  password: string;
}

export interface TokenResponse {
  access: string;
}

export interface User {
  user_id: string;
  name: string;
  password?: string;
}

export interface UserUpdate {
  name: string;
  password: string;
  user_id?: string;
}

export interface UserResponse {
  user_id: string;
  name: string;
  password?: string;
}

export enum UserActionTypes {
  FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE',

  FETCH_USER_REQUEST = 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'FETCH_USER_FAILURE',

  UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE',
}

export interface UserAction {
  type: UserActionTypes;
  users: UserResponse[];
  user: User | undefined;
}

export type UserActions = UserAction;
