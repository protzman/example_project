import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@material-ui/core';
import { GlobalState } from '../redux/reducers';
import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      [theme.breakpoints.down('md')]: {
        width: `100%`,
      },
      [theme.breakpoints.up('md')]: {
        width: 400,
      },
    },
  })
);

const snackBarTheme = createMuiTheme({
  palette: {
    mode: `light`,
  },
});

export default function SnackBar() {
  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { snackbarMessage, snackbarSeverity, snackbarTimestamp } = useSelector(
    (state: GlobalState) => state.application
  );

  useEffect(() => {
    snackbarMessage.length > 0 && setIsSnackbarOpen(true);
  }, [snackbarMessage.length, snackbarTimestamp]);

  return (
    <ThemeProvider theme={snackBarTheme}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={(event, reason) => {
          if (reason === 'timeout') {
            setIsSnackbarOpen(false);
          }
        }}
      >
        <Alert className={classes.snackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
