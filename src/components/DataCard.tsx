import { Grid, Card, Typography, CardContent } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
    dataCard: {
      textAlign: `center`,
      [theme.breakpoints.down('md')]: {
        minHeight: 159,
      },
      [theme.breakpoints.up('md')]: {
        minHeight: 215,
      },
    },
    rootGrid: {
      height: `100%`,
    },
  })
);

interface DataCardProps {
  primaryText: string;
  secondaryText: string;
}

export default function DataCard({
  primaryText,
  secondaryText,
}: DataCardProps) {
  const classes = useStyles();
  return (
    <Grid item xs={12} lg={4}>
      <Card className={classes.dataCard}>
        <CardContent>
          <Grid
            container
            spacing={3}
            direction="column"
            className={classes.rootGrid}
          >
            <Grid item>
              <Typography variant="h1">{primaryText}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{secondaryText}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
