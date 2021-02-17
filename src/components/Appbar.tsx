import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    spacer: {
      flexGrow: 1,
    },
    titleCard: {
      background: theme.palette.secondary.main,
      transform: `skew(-7deg)`,
      padding: `0 1rem`,
      marginRight: `3rem`,
    },
  })
);

export default function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <div className={classes.titleCard}>
            <Typography variant="h4">L A R V I S</Typography>
          </div>
          <div className={classes.spacer} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
