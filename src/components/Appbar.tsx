import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../redux/reducers';
import { KeyboardArrowDown } from '@material-ui/icons';
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
  const { user_id } = useSelector((state: GlobalState) => state.authorization);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <div className={classes.titleCard}>
            <Typography variant="h4">L A R V I S</Typography>
          </div>
          <div className={classes.spacer} />
          <Button
            color="secondary"
            variant="outlined"
            endIcon={<KeyboardArrowDown />}
          >
            {user_id}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
