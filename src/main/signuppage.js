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
            y: 0,
        }

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.signupsubmit=this.signupsubmit.bind(this);

    }

    async componentDidMount(){
        await axios.get('http://localhost:5000/login/submituser').then((e)=>{
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

        const user={
            username: this.state.username,
            password: this.state.password
        }

        var x=0;

        for(var i=0;i<this.state.users.length;i++){
            if(this.state.users[i]===user.username){
                this.setState({
                    y: 1
                });
                x=1
                // console.log('username already exists');
                break;
            }
        }

        if(x===0){
            await axios.post('http://localhost:5000/signin/createuser',user).then(res=>console.log(''));
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
                    This username already exists. Please use a different username
                </div>
            )}
            </Container>
            </div>
            </div>
        );

    }

}

export default withStyles(styles, { withTheme: true })(LoginPage);