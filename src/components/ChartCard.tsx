import React from 'react';

import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// TODO MOVE CHART PROPS TO LIKE APP PROPS OR SOMETHING
import { ChartCardProps } from '../utils/types';
import Chart from './Chart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: `100%`,
      textAlign: 'center',
    },
    cardContent: {
      height: 400,
    },
  })
);

export default function ChartCard({ title, data }: ChartCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="column">
          <Grid item className={classes.cardContent}>
            <Chart data={data} />
          </Grid>
          <Grid item>
            <Typography variant="h4">{title}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
