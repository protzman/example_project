export type Severity = 'success' | 'error' | 'warning' | 'info';

interface SetLoadingAction {
  type: ApplicationActionTypes.SET_APPLICATION_LOADING;
  loading: boolean;
  loadingText?: string;
}

interface SetSnackbarMessageAction {
  type: ApplicationActionTypes.SET_SNACKBAR_MESSAGE;
  message: string;
  severity: Severity;
}

export enum ApplicationActionTypes {
  SET_APPLICATION_LOADING = 'SET_APPLICATION_LOADING',
  SET_SNACKBAR_MESSAGE = 'SET_SNACKBAR_MESSAGE',
}

export type ApplicationActions = SetLoadingAction | SetSnackbarMessageAction;
