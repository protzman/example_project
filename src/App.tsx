import * as React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalState } from './redux/reducers';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SigninPage from './components/SigninPage';
import PrivateRoute from './components/PrivateRoute';
import RoutingPage from './components/RoutingPage';
import SnackBar from './components/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: 'felx',
      flexDirection: 'column',
    },
    loadingText: {
      marginTop: theme.spacing(6),
    },
  })
);

export default function App() {
  const classes = useStyles();
  const auth = useSelector((state: GlobalState) => state.authorization);
  const { loading, loadingText } = useSelector(
    (state: GlobalState) => state.application
  );
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={SigninPage} />
          <PrivateRoute
            path="/"
            component={RoutingPage}
            authorized={auth.authorized}
          />
        </Switch>
      </BrowserRouter>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress size={60} color="secondary" />
        <Typography variant="h4" className={classes.loadingText}>
          {loadingText}
        </Typography>
      </Backdrop>
      <SnackBar />
    </React.Fragment>
  );
}
