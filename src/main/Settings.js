import {Component} from 'react';
import SimpleNavbar from './SimpleNavbar';
import axios from 'axios';
import usericon from '../Assets/usericon.svg';
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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonAppBar from './Navbar';
import './mainpage.css';

const styles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    field: {
      borderColor: `#acacac !important`,
      color: `#cacaca`,
      borderWidth: `1px`,   
      marginTop: theme.spacing(-3),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(0,0,0),
      backgroundColor: `#4caf50`,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        color: `white`,
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),        
    },
  });

class Settings extends Component{

    constructor(props){
        super(props);

        this.state={
            username: window.name,
            password: '',
            id: '',
            successfulchange: 0,
            genres: [],
            genre: '/genre/movie/list',
            base_url: 'https://api.themoviedb.org/3',
            api_key: '?api_key=a39afca7618243991f7cf64e46955ba5',
            language: '&language=en-US',
            currentGenre: 0
        }

        this.changePassword=this.changePassword.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);

    }

    async componentDidMount(){

        await axios.get('http://localhost:5000/login/submituser').then((e)=>{
            e.data.map(user=>{
                if(user.username===this.state.username){                    
                    this.setState({
                        id: user._id
                    });
                }
            })
        });
        
        await fetch(this.state.base_url+this.state.genre+this.state.api_key+this.state.language).then(res=>res.json()).then(data=>{
            this.setState({
                genres: data.genres.map((e)=>e)
            });
        });
        console.log(this.state.genres);

    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    changePassword(e){
        e.preventDefault();

        const user={
            username: this.state.username,
            password: this.state.password
        }        

        axios.post('http://localhost:5000/update/'+this.state.id,user).then(res=>{
            document.getElementById("update-password-successful").style.display="block";
            document.getElementById("update-password").style.display="none";
        }).catch((err)=>{
            document.getElementById("update-password-successful").style.display="none";
            document.getElementById("update-password").style.display="block";
        });

        this.setState({
            password: ''
        });

    }

    render(){

        const {classes} = this.props;

        return (
            <div>                
                <SimpleNavbar />
                <div style={{textAlign: `center`}}>
                <div className="welcome-user-settings">
                    <div>
                        <img src={usericon}></img>
                    </div>
                    <div style={{opacity: 0.6}} >
                    {this.state.username}
                    </div>
                    <hr style={{marginBottom: `2px`, fontSize: `40px`, width: `80%`}} ></hr>                
                </div>
                <br></br>

                <form className={classes.form} noValidate>
                <span style={{fontSize: `18px`}}>                    
                    Change Password: 
                
                <TextField
                    variant="outlined"
                    margin="normal"
                    required                    
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.onChangePassword}
                    value={this.state.password}
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
                    variant="contained"
                    className={classes.submit}
                    onClick={this.changePassword}
                >
                    Change
                </Button>
                <span id="update-password-successful"> Password Updated Successfully!</span>
                <span id="update-password">Some error occurred</span>
                </span>                                
                </form>

                <form className={classes.form} noValidate>
                <span style={{fontSize: `18px`}}>  
                Genre:        
                <Select
                // value={this.state.currentGenre}
                // onChange={handleChange}
                label="Family"
                // displayEmpty
                className={classes.selectEmpty}
                >
                <MenuItem value="Family">
                    <em>Family</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </span>                                
                </form>

                </div>
            </div>
        );

    }

}

export default withStyles(styles, {withTheme: true})(Settings);