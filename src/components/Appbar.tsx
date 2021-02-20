import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonBase,
  useMediaQuery,
  Fade,
} from '@material-ui/core';
import {
  createStyles,
  darken,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GlobalState } from '../redux/reducers';
import { ExitToApp } from '@material-ui/icons';
import { signOut } from '../redux/actions/auth';
import {
  setApplicationLoading,
  setSnackbarMessage,
} from '../redux/actions/application';
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
      cursor: 'pointer',
      '&:hover': {
        background: darken(theme.palette.secondary.main, 0.2),
      },
    },
  })
);

export default function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // get the screen size so we can display routing button to users
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { user } = useSelector((state: GlobalState) => state.user);

  async function handleSignOut() {
    dispatch(setApplicationLoading(true, `signing out...`));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(signOut());
    dispatch(setApplicationLoading(false));
    dispatch(setSnackbarMessage(`Goodbye ${user?.name}!`, `info`));
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <ButtonBase
            className={classes.titleCard}
            onClick={() => history.push('/')}
          >
            <Typography variant="h4">L A R V I S</Typography>
          </ButtonBase>
          {!smallScreen && (
            <Button
              disableElevation
              variant="outlined"
              color="secondary"
              onClick={() => history.push('/users')}
            >
              Users
            </Button>
          )}
          <div className={classes.spacer} />
          {user && (
            // unnecessary fade in animation :)
            <Fade in={user.name !== ''}>
              <Button
                color="secondary"
                variant="outlined"
                endIcon={<ExitToApp />}
                onClick={handleSignOut}
              >
                {user.name}
              </Button>
            </Fade>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
