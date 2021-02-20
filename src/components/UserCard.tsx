import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Edit, Person } from '@material-ui/icons';
import clsx from 'clsx';
import faker from 'faker';

import { GlobalState } from '../redux/reducers';
import { UserResponse } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 400,
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.primary,
    },
    editButton: {
      // compensate for using h4 in the header vs default
      marginTop: `5px`,
    },
  })
);

interface UserCardProps {
  user: UserResponse;
}

export default function UserCard({ user }: UserCardProps) {
  const classes = useStyles();
  const history = useHistory();

  const { user_id } = useSelector((state: GlobalState) => state.authorization);
  const signedIn = user.user_id === user_id;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={clsx({ [classes.avatar]: signedIn })}>
            <Person />
          </Avatar>
        }
        title={user.name}
        titleTypographyProps={{
          variant: 'h4',
        }}
        subheader={signedIn ? `Active` : `Inactive`}
        subheaderTypographyProps={{
          style: {
            fontStyle: 'italic',
          },
        }}
        action={
          signedIn && (
            <IconButton
              className={classes.editButton}
              onClick={() => history.push(`/users/${user_id}`)}
            >
              <Edit />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Typography variant="caption" component="div" gutterBottom>
          {faker.lorem.paragraphs()}
        </Typography>
      </CardContent>
    </Card>
  );
}
