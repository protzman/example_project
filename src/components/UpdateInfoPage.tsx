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
import { useHistory, useParams } from 'react-router-dom';
import { GlobalState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../utils/api';
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

interface UpdateInfoPageProps {
  user_id: string;
}

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

  const { user_id } = useParams<UpdateInfoPageProps>();
  const { loading } = useSelector((state: GlobalState) => state.application);
  const { token } = useSelector((state: GlobalState) => state.authorization);

  useEffect(() => {
    async function fetch_user() {
      dispatch(setApplicationLoading(true, `fetching user info...`));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetchUser(token, user_id);
      setCredentials({
        ...credentials,
        // TODO try and get rid of it having to be || ''
        user_id: response.data?.user_id || '',
        name: response.data?.name || '',
        password_old: response.data?.password || '',
      });
      dispatch(setApplicationLoading(false));
    }
    fetch_user();
  }, []);

  async function updateInfo() {
    dispatch(setApplicationLoading(true, `updating user info...`));
    try {
      dispatch(updateUserRequest());

      const response = await updateUser(token, {
        user_id: credentials.user_id,
        name: credentials.name,
        password: credentials.password_new,
      });

      if (response.data) {
        dispatch(
          updateUserSuccess({
            user_id: response.data?.user_id,
            name: response.data?.name,
          })
        );
      }

      history.push('/');
    } catch (error) {
      console.log(`error... ${error}`);
      dispatch(setApplicationLoading(false));
    }
  }

  // TODO CREATE FORM HOOK
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
                  disabled={
                    credentials.name === '' || credentials.password_new === ''
                  }
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
