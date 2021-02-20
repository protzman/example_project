import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Fab, Grid, Typography, useMediaQuery } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  fetchAcquisitionsRequest,
  fetchAcquisitionsSuccess,
  setNormalizedAcquisitionData,
} from '../redux/actions/acquisition';

import DailyChartCard from './DailyChartCard';
import DataCard from './DataCard';
import FilterCard from './FilterCard';
import NormalizedChartCard from './NormalizedChartCard';

import { GlobalState } from '../redux/reducers';
import { setApplicationLoading } from '../redux/actions/application';
import { fetchUser, fetchAcquisitions } from '../utils/api';
import { normalizeAcquisitions } from '../utils/helpers';
import { People } from '@material-ui/icons';
import { fetchUserRequest, fetchUserSuccess } from '../redux/actions/user';
import { PerDayAcquisition } from '../types';

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
    fab: {
      position: `fixed`,
      padding: theme.spacing(1, 3),
      left: theme.spacing(2),
      bottom: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeDate, setActiveDate] = useState<PerDayAcquisition>();

  // get the screen size so we can display routing button to users
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { loading } = useSelector((state: GlobalState) => state.application);
  const { token, user_id } = useSelector(
    (state: GlobalState) => state.authorization
  );
  const { groupedAcquisitions, total, averagePerDay, minMax } = useSelector(
    (state: GlobalState) => state.acquisition
  );

  useEffect(() => {
    dispatch(setApplicationLoading(true, `fetching acquisitions...`));
    dispatch(fetchAcquisitionsRequest());
    async function fetch_acquisitions() {
      // simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // fetch the user that just signed in
      dispatch(fetchUserRequest());
      const user = await fetchUser(token, user_id);
      dispatch(fetchUserSuccess(user));

      //fetch the acquisitions
      const acquisitions = await fetchAcquisitions(token);
      dispatch(fetchAcquisitionsSuccess(acquisitions));
      dispatch(
        setNormalizedAcquisitionData(normalizeAcquisitions(acquisitions))
      );
      dispatch(setApplicationLoading(false));
    }
    fetch_acquisitions();
  }, []);

  return (
    <div>
      {!loading && (
        <React.Fragment>
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
              <DailyChartCard
                title={`Grouped Daily Sites Count`}
                type="line"
                data={groupedAcquisitions}
              />
            </Grid>
            <Grid item xs={12}>
              <DailyChartCard
                title={`Grouped Daily Sites Count`}
                type="bar"
                data={groupedAcquisitions}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilterCard onChange={setActiveDate} />
            </Grid>
            {activeDate && (
              <Grid item xs={12} lg={8}>
                <NormalizedChartCard
                  title={`Sites for ${new Date(
                    activeDate?.date
                  ).toLocaleString()}`}
                  type="line"
                  data={activeDate?.acquisitions}
                />
              </Grid>
            )}
          </Grid>
          {smallScreen && (
            <Fab
              size="small"
              variant="extended"
              color="primary"
              className={classes.fab}
              onClick={() => history.push('/users')}
            >
              <People className={classes.extendedIcon} />
              <Typography variant="overline">Users</Typography>
            </Fab>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
