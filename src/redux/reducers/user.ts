import { Reducer } from 'redux';
import { UserResponse } from '../../types/user';
import { UserActions, UserActionTypes } from '../actions/user';

export interface UserState {
  users: UserResponse[];
}

const initialUserState: UserState = {
  users: [],
};

export const userReducer: Reducer<UserState, UserActions> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
      };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
