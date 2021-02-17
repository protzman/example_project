import { combineReducers } from 'redux';
import { applicationReducer, ApplicationState } from './application';
import { authReducer, AuthState } from './auth';
import { acquisitionReducer, AcquisitionState } from './acquisition';

export interface GlobalState {
  application: ApplicationState;
  authorization: AuthState;
  acquisition: AcquisitionState;
}

export const rootReducer = combineReducers<GlobalState>({
  application: applicationReducer,
  authorization: authReducer,
  acquisition: acquisitionReducer,
});
