import { Reducer } from 'redux';
import {
  ApplicationActions,
  ApplicationActionTypes,
  Severity,
} from '../../types';

export interface ApplicationState {
  loading: boolean;
  loadingText?: string;
  snackbarMessage: string;
  snackbarSeverity: Severity;
  snackbarTimestamp: Date; // used to create unique object with each change
}

const initialApplicationState: ApplicationState = {
  loading: false,
  loadingText: '',
  snackbarMessage: '',
  snackbarSeverity: 'info',
  snackbarTimestamp: new Date(),
};

export const applicationReducer: Reducer<
  ApplicationState,
  ApplicationActions
> = (state = initialApplicationState, action) => {
  switch (action.type) {
    case ApplicationActionTypes.SET_APPLICATION_LOADING:
      return {
        ...state,
        loading: action.loading,
        loadingText: action.loading ? action.loadingText : '',
      };
    case ApplicationActionTypes.SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackbarMessage: action.message,
        snackbarSeverity: action.severity || 'info',
        snackbarTimestamp: new Date(),
      };

    default:
      return state;
  }
};
