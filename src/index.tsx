import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import configureStore from './redux';

export const appReduxStore = configureStore();
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Provider store={appReduxStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StyledEngineProvider>,
  document.querySelector('#root')
);
