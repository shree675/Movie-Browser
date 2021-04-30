import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    '&:hover': {
        backgroundColor: fade(theme.palette.error.main, 0.25),
      },
  },
}));

export default function SimpleNavbar(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            Settings
          </Typography>
          <Link href="/" style={{textDecoration: `none`, color: `white`}}>
            <Button classes={{root: classes.button}} color="inherit" style={{marginLeft: `10px`}}>Logout</Button>
          </Link>             
        </Toolbar>
      </AppBar>
    </div>
  );
}