import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducers';

import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Autocomplete,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DailyAcquisition, PerDayAcquisition } from '../utils/types';
import Chart from './Chart';
import BarChart from './BarChart';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: `100%`,
      textAlign: 'center',
    },
    cardContent: {
      [theme.breakpoints.up('md')]: {
        height: 400,
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridItem: {
      [theme.breakpoints.down('md')]: {
        width: `100%`,
      },
      [theme.breakpoints.up('md')]: {
        width: 400,
      },
    },
    adornment: {
      marginRight: '-4px',
    },
    textField: {
      borderRadius: theme.shape.borderRadius,
    },
  })
);

export default function FilterCard() {
  const classes = useStyles();
  const { perDayAcquisitions } = useSelector(
    (state: GlobalState) => state.acquisition
  );
  const [activeDate, setActiveDate] = useState<PerDayAcquisition>();

  // TODO turn type to enum
  function renderChart(type: string, data: DailyAcquisition[]) {
    switch (type) {
      case 'line':
        return <Chart data={data} />;
      case 'bar':
        return <BarChart data={data} />;
      default:
        <Typography variant="overline">Something went wrong...</Typography>;
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="column"
          className={classes.cardContent}
          spacing={3}
        >
          <Grid item className={classes.gridItem}>
            <Typography variant="h4">Search for per day results</Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Autocomplete
              options={perDayAcquisitions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Date"
                  fullWidth={true}
                  variant="filled"
                  InputProps={{
                    ...params.InputProps,
                    fullWidth: true,
                    className: classes.textField,
                    disableUnderline: true,
                  }}
                />
              )}
              getOptionLabel={(option: PerDayAcquisition) => option.date}
              onChange={(event, value) => value && setActiveDate(value)}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button fullWidth variant="outlined" color="secondary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
