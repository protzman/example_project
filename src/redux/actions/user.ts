import { Dispatch } from 'redux';
import { UserResponse } from '../../types/user';
import { User } from '../../utils/types';

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

interface UserAction {
  type: UserActionTypes;
  users: UserResponse[];
  user: User;
}

export const fetchUsersRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USERS_REQUEST,
    });
  };
};

// TODO RENAME USERREPONSE TO USERSRESPONSE
export const fetchUsersSuccess = (users: UserResponse[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USERS_SUCCESS,
      users,
    });
  };
};

export const fetchUserRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USER_REQUEST,
    });
  };
};

export const fetchUserSuccess = (user: User) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USER_SUCCESS,
      user,
    });
  };
};

export const updateUserRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.UPDATE_USER_REQUEST,
    });
  };
};

export const updateUserSuccess = (user: UserResponse) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.UPDATE_USER_SUCCESS,
      user,
    });
  };
};

export type UserActions = UserAction;
