import { Dispatch } from 'redux';
import { UserActionTypes, User, UserResponse } from '../../types';

export const fetchUsersRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USERS_REQUEST,
    });
  };
};

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
