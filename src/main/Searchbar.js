import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

var val='';

export default function SearchAppBar(props) {

    function onChangeSearch(e){
      props.onChangeSearchMain(e.target.value);
    }

    function onClear(e){
      props.onChangeSearchMain('');
      val='';
    }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            Browse Movies
          </Typography>          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              // value={val}
              onChange={onChangeSearch}
            />
          </div>  
          <Button onClick={onClear} color="inherit" style={{marginLeft: `10px`}}>Clear Search</Button>
            <Link href="/usersettings" style={{textDecoration: `none`, color: `white`}}>
                <Button color="inherit" style={{marginLeft: `10px`}}>Settings</Button>
            </Link>        
            <Link href="/" style={{textDecoration: `none`, color: `white`}}>
                <Button classes={{root: classes.button}} color="inherit" style={{marginLeft: `10px`}}>Logout</Button>
            </Link>            
        </Toolbar>
      </AppBar>
    </div>
  );
}