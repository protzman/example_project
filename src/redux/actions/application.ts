import { Dispatch } from 'redux';

export enum ApplicationActionTypes {
  SET_APPLICATION_LOADING = 'SET_APPLICATION_LOADING',
}

interface ApplicationAction {
  type: ApplicationActionTypes;
  loading: boolean;
  loadingText?: string;
}

export const setApplicationLoading = (
  loading: boolean,
  loadingText?: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ApplicationActionTypes.SET_APPLICATION_LOADING,
      loading,
      loadingText,
    });
  };
};

export type ApplicationActions = ApplicationAction;
