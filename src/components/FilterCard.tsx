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
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PerDayAcquisition } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: `100%`,
      textAlign: 'center',
    },
    cardContent: {
      [theme.breakpoints.up('md')]: {
        height: 464,
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
    textField: {
      borderRadius: theme.shape.borderRadius,
    },
  })
);

interface FilterCardProps {
  onChange(perDayAcquisition: PerDayAcquisition): void;
}

export default function FilterCard({ onChange }: FilterCardProps) {
  const classes = useStyles();
  const { perDayAcquisitions } = useSelector(
    (state: GlobalState) => state.acquisition
  );

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
              onChange={(event, value) => value && onChange(value)}
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
