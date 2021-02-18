import { Dispatch } from 'redux';
import { UserResponse } from '../../types/user';

export enum UserActionTypes {
  FETCH_USER_REQUEST = 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'FETCH_USER_FAILURE',
}

interface UserAction {
  type: UserActionTypes;
  users: UserResponse[];
}

export const fetchUsersRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USER_REQUEST,
    });
  };
};

export const fetchUsersSuccess = (users: UserResponse[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_USER_SUCCESS,
      users,
    });
  };
};

export type UserActions = UserAction;
