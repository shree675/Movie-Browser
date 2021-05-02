import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import ButtonAppBar from './Navbar';
import axios from 'axios';
import {Component} from 'react';
import config from '../config';

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

class LoginPage extends Component{

    constructor(props){
        super(props);

        this.state={
            username: '',
            password: '',
            users: [],
            passwords: [],
            successfulLogin: true,
            x: 1,
        }

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.submit=this.submit.bind(this);

    }

    async componentDidMount(){
        console.log(config.config.SERVER_URI);
        await axios.get(`${config.config.SERVER_URI}/login/submituser`).then((e)=>{
            console.log(e);
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

    submit(e){
        e.preventDefault();

        var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        const user={
            username: this.state.username,
            password: this.state.password
        }

        this.setState({
            x: 0
        });

        for(var i=0;i<this.state.users.length;i++){
            if(this.state.users[i]===user.username){
                this.setState({
                    x: 1
                });

                var passwordBytes = aesjs.utils.utf8.toBytes(user.password);
                var aesCtr = new aesjs.ModeOfOperation.ctr(key,new aesjs.Counter(4));
                var encryptedBytes = aesCtr.encrypt(passwordBytes);
                var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

                if(this.state.passwords[i]===encryptedHex){
                    this.setState({
                        successfulLogin: true
                    });
                    window.name=this.state.username;
                    window.location='/browse';
                }
                else{
                    this.setState({
                        successfulLogin: false
                    });
                }
                break;
            }
        }

    }

    render(){

        const {classes} = this.props;

        return (

            <div style={{backgroundColor: `#282c34`}}>
                {/* <div style={{display: `none`}}><MainPage username={this.state.username} /></div> */}
                <ButtonAppBar />
            
            <div  style={{backgroundColor: `#282c34`, color: `white`}}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Login
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    // id="email"
                    label="Enter Username"
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
                    label="Enter Password"
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
                    onClick={this.submit}
                >
                    Login
                </Button>
                    <div style={{textAlign: `center`}}>
                    <Link href="/signup" variant="body1">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </div>
                </form>
            </div>
            {this.state.successfulLogin?(null):(
                <div style={{color: `tomato`, textAlign: `center`, marginTop: `10px`}}>
                    Incorrect username/password
                </div>
            )}
            {(this.state.x===1)?(null):(
                <div style={{color: `tomato`, textAlign: `center`, marginTop: `10px`}}>
                    This username does not exist. Please sign up
                </div>
            )}
            </Container>
            </div>
            </div>
        );

    }

}

export default withStyles(styles, { withTheme: true })(LoginPage);