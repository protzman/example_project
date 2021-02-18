import { combineReducers } from 'redux';
import { applicationReducer, ApplicationState } from './application';
import { authReducer, AuthState } from './auth';
import { acquisitionReducer, AcquisitionState } from './acquisition';
import { userReducer, UserState } from './user';

export interface GlobalState {
  application: ApplicationState;
  authorization: AuthState;
  acquisition: AcquisitionState;
  user: UserState;
}

export const rootReducer = combineReducers<GlobalState>({
  application: applicationReducer,
  authorization: authReducer,
  acquisition: acquisitionReducer,
  user: userReducer,
});
