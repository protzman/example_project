import { Reducer } from 'redux';
import {
  ApplicationActions,
  ApplicationActionTypes,
} from '../actions/application';

export interface ApplicationState {
  loading: boolean;
  loadingText?: string;
}

const initialAcquisitionState: ApplicationState = {
  loading: false,
  loadingText: '',
};

export const applicationReducer: Reducer<
  ApplicationState,
  ApplicationActions
> = (state = initialAcquisitionState, action) => {
  switch (action.type) {
    case ApplicationActionTypes.SET_APPLICATION_LOADING:
      return {
        ...state,
        loading: action.loading,
        loadingText: action.loading ? action.loadingText : '',
      };
    default:
      return state;
  }
};
