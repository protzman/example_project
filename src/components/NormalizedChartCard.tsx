import React from 'react';

import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { NormalizedAcquisition } from '../types';

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

interface NormalizedChartCardProps {
  title: string;
  type: string;
  data: NormalizedAcquisition[];
}

export default function NormalizedChartCard({
  title,
  data,
  type,
}: NormalizedChartCardProps) {
  const classes = useStyles();

  // TODO turn type to enum
  function renderChart(type: string, data: NormalizedAcquisition[]) {
    switch (type) {
      case 'line':
        return <LineChart data={data} />;
      case 'bar':
        return <BarChart data={data} />;
      case 'pie':
        return <PieChart data={data} />;
      default:
        <Typography variant="overline">Something went wrong...</Typography>;
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="column">
          <Grid item className={classes.cardContent}>
            {renderChart(type, data)}
          </Grid>
          <Grid item>
            <Typography variant="h4">{title}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
