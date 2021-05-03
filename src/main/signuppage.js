import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import ButtonAppBar from './Navbar';
import config from '../config';
import axios from 'axios';
import {Component} from 'react';

var aesjs=require('aes-js');

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  field: {
    borderColor: `#acacac !important`,
    color: `#cacaca`,
    borderWidth: `1px`
  },
  submit: {
    margin: theme.spacing(3,0,2),
    backgroundColor: `#4caf50`
  },
});

class SignupPage extends Component{

    constructor(props){
        super(props);

        this.state={
            username: '',
            password: '',
            users: [],
            passwords: [],            
            y: 0,
        }

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.signupsubmit=this.signupsubmit.bind(this);

    }

    async componentDidMount(){
        // ${config.config.SERVER_URI}
        await axios.get(`/login/submituser`).then((e)=>{
            this.setState({
                users: e.data.map(user=>user.username),
                passwords: e.data.map(user=>user.password)
            });            
        }).catch(err=>console.log(err));
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){        
        this.setState({
            password: e.target.value
        });
    }

    async signupsubmit(e){
        e.preventDefault();

        var arr=[];
        arr.push(12);

        var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        var passwordBytes = aesjs.utils.utf8.toBytes(this.state.password);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key,new aesjs.Counter(4));
        var encryptedBytes = aesCtr.encrypt(passwordBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

        const user={
            username: this.state.username,
            password: encryptedHex
        }

        const pref={
            username: this.state.username,
            genre: arr
        }

        var x=0;

        for(var i=0;i<this.state.users.length;i++){
            if(this.state.users[i]===user.username || this.state.passwords[i]===user.password){
                this.setState({
                    y: 1
                });
                x=1
                break;
            }
        }

        if(x===0){
            await axios.post(`/signin/createuser`,user).then(res=>console.log(''));
            await axios.post(`/pref/createpreference`,pref).then(res=>console.log(''));
            window.name=this.state.username;
            window.location='/browse';
        }

    }

    render(){

        const {classes} = this.props;

        return (

            <div style={{backgroundColor: `#282c34`}}>
                <ButtonAppBar />
            
            <div  style={{backgroundColor: `#282c34`, color: `white`}}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    // id="email"
                    label="Create Username"
                    // name="email"
                    // autoComplete="email"
                    autoFocus
                    onChange={this.onChangeUsername}
                    InputLabelProps={{
                        classes: {
                            root: classes.field,                    
                        }
                    }}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.field,
                            input: classes.field
                        }
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Create Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.onChangePassword}
                    InputLabelProps={{
                        classes: {
                            root: classes.field,                    
                        }
                    }}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.field,
                            input: classes.field
                        }
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={this.signupsubmit}
                >
                    Sign Up
                </Button>
                </form>
            </div>
            {(this.state.y===0)?(null):(
                <div style={{color: `tomato`, textAlign: `center`, marginTop: `10px`}}>
                    This username/password already exists. Please use different username/password
                </div>
            )}
            </Container>
            </div>
            </div>
        );

    }

}

export default withStyles(styles, {withTheme: true})(SignupPage);