import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchToken } from '../utils/api';
import { signInRequest, signInSuccess } from '../redux/actions/auth';
import { setApplicationLoading } from '../redux/actions/application';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(3),
      background: theme.palette.primary.main,
      width: 400,
      position: 'absolute',
      top: `calc(50% - 250px)`,
      right: `calc(50% - 200px)`,
    },
  })
);
export default function SigninPage() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    user_id: '',
    password: '',
  });
  const classes = useStyles();
  const history = useHistory();

  async function signin() {
    try {
      dispatch(setApplicationLoading(true, `signing in...`));
      dispatch(signInRequest(credentials));
      const response = await fetchToken(credentials);
      dispatch(
        signInSuccess({
          user_id: credentials.user_id,
          token: response.data?.access,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(setApplicationLoading(false));
      history.push('/');
      // simulate load
    } catch (error) {
      if (error instanceof Error) {
        console.log(`error... ${error}`);
      }
    }
  }

  // TODO CREATE FORM HOOK
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Typography variant="h4">Sign In</Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder="Username"
              value={credentials.user_id}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  user_id: e.currentTarget.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              placeholder="Password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.currentTarget.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={signin}
              disabled={
                credentials.user_id === '' || credentials.password === ''
              }
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
