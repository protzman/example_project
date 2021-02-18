import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GlobalState } from '../redux/reducers';
import { ExitToApp } from '@material-ui/icons';
import { signOut } from '../redux/actions/auth';
import { setApplicationLoading } from '../redux/actions/application';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    spacer: {
      flexGrow: 1,
    },
    titleCard: {
      background: theme.palette.secondary.main,
      transform: `skew(-7deg)`,
      padding: `0 1rem`,
      marginRight: `3rem`,
    },
  })
);

export default function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user_id } = useSelector((state: GlobalState) => state.authorization);

  async function handleSignOut() {
    dispatch(setApplicationLoading(true, `signing out...`));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(signOut());
    dispatch(setApplicationLoading(false));
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <div className={classes.titleCard} onClick={() => history.push('/')}>
            <Typography variant="h4">L A R V I S</Typography>
          </div>
          <div className={classes.spacer} />
          <Button
            color="secondary"
            variant="outlined"
            endIcon={<ExitToApp />}
            onClick={handleSignOut}
          >
            {user_id}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
