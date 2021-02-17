import React, { useEffect } from 'react';
import Appbar from './Appbar';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducers';
import { Grid } from '@material-ui/core';
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
    container: {
      padding: theme.spacing(3),
    },
    dataCard: {
      height: 200,
      textAlign: 'center',
    },
    toolbar: theme.mixins.toolbar,
  })
);

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { groupedAcquisitions, total, averagePerDay, minMax } = useSelector(
    (state: GlobalState) => state.acquisition
  );
  const { loading } = useSelector((state: GlobalState) => state.application);
  const { token } = useSelector((state: GlobalState) => state.authorization);

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
    <React.Fragment>
      <Appbar />
      <div className={classes.toolbar} />
      {!loading && (
        <div className={classes.container}>
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
              <ChartCard
                title={`Daily Sites Count`}
                data={groupedAcquisitions}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
}
