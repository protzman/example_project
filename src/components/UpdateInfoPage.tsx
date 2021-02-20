import React, { useState, useEffect } from 'react';
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
import { GlobalState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/api';
import { setApplicationLoading } from '../redux/actions/application';
import { updateUserRequest, updateUserSuccess } from '../redux/actions/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.down('md')]: {
        background: theme.palette.primary.main,
        position: 'absolute',
        padding: `40% ${theme.spacing(3)} `,
        height: `calc(100% - ${theme.spacing(14)})`,
        width: `calc(100% - ${theme.spacing(6)})`,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
        background: theme.palette.primary.main,
        width: 400,
        position: 'absolute',
        top: `calc(50% - 250px)`,
        right: `calc(50% - 200px)`,
      },
    },
  })
);

export default function UpdateInfoPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    user_id: '',
    name: '',
    password_old: '',
    password_new: '',
  });

  const { loading } = useSelector((state: GlobalState) => state.application);
  const { token } = useSelector((state: GlobalState) => state.authorization);
  const { user } = useSelector((state: GlobalState) => state.user);

  useEffect(() => {
    if (user) {
      setCredentials({
        ...credentials,
        user_id: user.user_id,
        name: user.name,
        password_new: '',
        password_old: user.password || '',
      });
    }
  }, []);

  async function updateInfo() {
    dispatch(setApplicationLoading(true, `updating user info...`));
    try {
      dispatch(updateUserRequest());

      const response = await updateUser(token, {
        user_id: credentials.user_id,
        name: credentials.name,
        // pass in the old password if they didn't change it
        password:
          credentials.password_new === ''
            ? credentials.password_old
            : credentials.password_new,
      });

      if (response) {
        dispatch(
          updateUserSuccess({
            user_id: response.user_id,
            name: response.name,
          })
        );
      }

      history.push('/', {
        from: '/users/update',
        alert: `Updated account info.`,
      });
    } catch (error) {
      dispatch(setApplicationLoading(false));
    }
  }

  return (
    <React.Fragment>
      {!loading && (
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={4} direction="column">
              <Grid item>
                <Typography variant="h4">Update Info</Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Name"
                  value={credentials.name}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      name: e.currentTarget.value,
                    })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  label="Existing Password"
                  value={credentials.password_old}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="New Password"
                  value={credentials.password_new}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password_new: e.currentTarget.value,
                    })
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={updateInfo}
                  disabled={credentials.name === ''}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
}
