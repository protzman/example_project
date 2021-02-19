import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GlobalState } from '../redux/reducers';
import { Fab, Grid, Typography, useMediaQuery } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
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
import { People } from '@material-ui/icons';

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

  // get the screen size so we can display routing button to users
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
              <ChartCard
                title={`Daily Sites Count`}
                data={groupedAcquisitions}
              />
            </Grid>
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
