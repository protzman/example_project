import React from 'react';
import Appbar from './Appbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import UserPage from './UserPage';
import HomePage from './HomePage';
import UpdateInfoPage from './UpdateInfoPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    container: {
      padding: theme.spacing(3),
    },
  })
);

export default function RoutingPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Appbar />
      <div className={classes.toolbar} />
      <div className={classes.container}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={UserPage} />
          <Route exact path="/users/:user_id" component={UpdateInfoPage} />
        </Switch>
      </div>
    </React.Fragment>
  );
}
