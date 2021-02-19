import { Reducer } from 'redux';
import { UserResponse, User } from '../../types/user';
import { UserActions, UserActionTypes } from '../actions/user';

export interface UserState {
  users: UserResponse[];
  user: User;
}

const initialUserState: UserState = {
  users: [],
  user: {},
};

export const userReducer: Reducer<UserState, UserActions> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
      };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
      };
    case UserActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
      };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case UserActionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
      };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
