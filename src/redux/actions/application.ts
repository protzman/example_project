import { Dispatch } from 'redux';

import { ApplicationActionTypes, Severity } from '../../types';

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

export const setSnackbarMessage = (message: string, severity?: Severity) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ApplicationActionTypes.SET_SNACKBAR_MESSAGE,
      message,
      severity,
    });
  };
};
