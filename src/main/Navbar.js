import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    '&:hover': {
        backgroundColor: fade(theme.palette.success.main, 0.25),
      },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Movie Browser
          </Typography>
          <Link href="https://movie-browser-v2.herokuapp.com/login" style={{textDecoration: `none`, color: `white`}}>
          <Button classes={{root: classes.button}} color="inherit">Login</Button>
          </Link>
          <Link href="/signup" style={{textDecoration: `none`, color: `white`}}>
          <Button classes={{root: classes.button}} color="inherit">Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}