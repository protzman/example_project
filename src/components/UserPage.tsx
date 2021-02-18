import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { GlobalState } from '../redux/reducers';
import { setApplicationLoading } from '../redux/actions/application';
import { fetchUsersRequest, fetchUsersSuccess } from '../redux/actions/user';
import { fetchUsers } from '../utils/api';
import UserCard from './UserCard';

export default function UserPage() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state: GlobalState) => state.application);
  const { users } = useSelector((state: GlobalState) => state.user);
  const { token } = useSelector((state: GlobalState) => state.authorization);

  useEffect(() => {
    dispatch(setApplicationLoading(true, `fetching users...`));
    dispatch(fetchUsersRequest());
    async function fetch_users() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetchUsers(token);
      const results = response?.data ?? [];
      dispatch(fetchUsersSuccess(results));
      dispatch(setApplicationLoading(false));
    }
    fetch_users();
  }, []);

  return (
    <React.Fragment>
      {!loading && (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid key={user.user_id} item xs={12} lg={4}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
}
