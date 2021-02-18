import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GlobalState } from '../redux/reducers';
import { Button, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DataCard from './DataCard';
import {
  fetchAcquisitionsRequest,
  fetchAcquisitionsSuccess,
  setNormalizedAcquisitionData,
} from '../redux/actions/acquisition';
import ChartCard from './ChartCard';
import { setApplicationLoading } from '../redux/actions/application';
import { fetchAcquisitions } from '../utils/api';
import { normalizeAcquisitions } from '../utils/helpers';

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
    dataCard: {
      height: 200,
      textAlign: 'center',
    },
  })
);

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading } = useSelector((state: GlobalState) => state.application);
  const { token } = useSelector((state: GlobalState) => state.authorization);
  const { groupedAcquisitions, total, averagePerDay, minMax } = useSelector(
    (state: GlobalState) => state.acquisition
  );

  useEffect(() => {
    dispatch(setApplicationLoading(true, `fetching acquisitions...`));
    dispatch(fetchAcquisitionsRequest());
    async function fetch_acquisitions() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetchAcquisitions(token);
      const results = response?.data ?? [];
      dispatch(fetchAcquisitionsSuccess(results));
      dispatch(setNormalizedAcquisitionData(normalizeAcquisitions(results)));
      dispatch(setApplicationLoading(false));
    }
    fetch_acquisitions();
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => history.push('/users')}
      >
        Users
      </Button>
      {!loading && (
        <Grid container spacing={3}>
          <DataCard primaryText={`${total}`} secondaryText={`Total Sites`} />
          <DataCard
            primaryText={`${averagePerDay}`}
            secondaryText={`Sites/Day Average`}
          />
          <DataCard
            primaryText={`${minMax}`}
            secondaryText={`Minimum Maximum`}
          />
          <Grid item xs={12}>
            <ChartCard title={`Daily Sites Count`} data={groupedAcquisitions} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
