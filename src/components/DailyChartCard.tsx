import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DailyAcquisition } from '../types';
import LineChart from './LineChart';
import BarChart from './BarChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: `100%`,
      textAlign: `center`,
    },
    cardContent: {
      height: 400,
    },
  })
);

interface ChartCardProps {
  title: string;
  type: string;
  data: DailyAcquisition[];
}

export default function ChartCard({ title, data, type }: ChartCardProps) {
  const classes = useStyles();

  function renderChart(type: string, data: DailyAcquisition[]) {
    switch (type) {
      case 'line':
        return <LineChart data={data} />;
      case 'bar':
        return <BarChart data={data} />;
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
