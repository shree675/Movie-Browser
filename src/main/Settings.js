import {Component} from 'react';
import SimpleNavbar from './SimpleNavbar';
import axios from 'axios';
import usericon from '../Assets/usericon.svg';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import './mainpage.css';
import config from '../config';

var aesjs=require('aes-js');

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
            currentGenre: 0,
            act: false,
            adv: false,
            com: false,
            fam: false,
            hor: false,
            scf: false,
            genid: '',
            genarr: [],
        }

        this.changePassword=this.changePassword.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.updateGenres=this.updateGenres.bind(this);
        this.updateAct=this.updateAct.bind(this);
        this.updateAdv=this.updateAdv.bind(this);
        this.updateCom=this.updateCom.bind(this);
        this.updateFam=this.updateFam.bind(this);
        this.updateHor=this.updateHor.bind(this);
        this.updateScf=this.updateScf.bind(this);

    }

    async componentDidMount(){

        await axios.get(`/login/submituser`).then((e)=>{
            e.data.map(user=>{
                if(user.username===this.state.username){                    
                    this.setState({
                        id: user._id
                    });
                }
            })
        });

        await axios.get(`/pref/allpreferences`).then((e)=>{
            e.data.map(user=>{
                if(user.username===this.state.username){                    
                    this.setState({
                        genid: user._id,
                        genres: user.genre
                    });
                }
            })
        });
        
        for(var i=0;i<this.state.genres.length;i++){
            if(this.state.genres[i]===28){
                this.setState({
                    act: true
                });
            }
            else if(this.state.genres[i]===12){
                this.setState({
                    adv: true
                });
            }
            else if(this.state.genres[i]===35){
                this.setState({
                    com: true
                });
            }
            else if(this.state.genres[i]===10751){
                this.setState({
                    fam: true
                });
            }
            else if(this.state.genres[i]===27){
                this.setState({
                    hor: true
                });
            }
            if(this.state.genres[i]===878){
                this.setState({
                    scf: true
                });
            }
        }

    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    changePassword(e){
        e.preventDefault();

        var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        var passwordBytes = aesjs.utils.utf8.toBytes(this.state.password);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key,new aesjs.Counter(4));
        var encryptedBytes = aesCtr.encrypt(passwordBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

        const user={
            username: this.state.username,
            password: encryptedHex
        }        

        axios.post(`/update/`+this.state.id,user).then(res=>{
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

    async updateGenres(){

        var arr=new Array();

        if(this.state.act===true){
            arr.push(28);
        }
        if(this.state.adv===true){
            arr.push(12);
        }
        if(this.state.com===true){
            arr.push(35);
        }
        if(this.state.fam===true){
            arr.push(10751);
        }
        if(this.state.hor===true){
            arr.push(27);
        }
        if(this.state.scf===true){
            arr.push(878);
        }

        const pref={
            username: this.state.username,
            genre: arr
        }

        await axios.post(`/pref/update/`+this.state.genid,pref).then(res=>{
            document.getElementById("update-genre-successful").style.display="block";
            document.getElementById("update-genre").style.display="none";
        }).catch((err)=>{
            document.getElementById("update-genre-successful").style.display="none";
            document.getElementById("update-genre").style.display="block";
        });
    }

    updateAct(){
        this.setState({
            act: !this.state.act
        });
    }
    
    updateAdv(){
        this.setState({
            adv: !this.state.adv
        });
    }
    
    updateFam(){
        this.setState({
            fam: !this.state.fam
        });
    }

    updateHor(){
        this.setState({
            hor: !this.state.hor
        });
    }

    updateCom(){
        this.setState({
            com: !this.state.com
        });
    }

    updateScf(){
        this.setState({
            scf: !this.state.scf
        });
    }

    render(){

        const {classes} = this.props;

        return (
            <div>                
                <SimpleNavbar />
                <div style={{textAlign: `center`, width: `100%`}}>
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
                <span id="update-password">Some error occurred. Please try a different password</span>
                </span>                                
                </form>

                <div className="checkboxes">
                    <br></br>
                    <div style={{fontSize: `20px`, color: `grey`}}>Pick your preferred Genre:</div>
                    
                    <table>
                        <tr>
                            <td style={{textAlign: `right`}}>Action</td>
                            <td style={{textAlign: `left`}}>
                            <Checkbox
                                checked={this.state.act}
                                onChange={this.updateAct}
                                name="checkedB"
                                color="primary"
                            />
                            </td>
                        </tr>

                        <tr>
                            <td style={{textAlign: `right`}}>Adventure</td>
                            <td style={{textAlign: `left`}}>
                            <Checkbox
                                checked={this.state.adv}
                                onChange={this.updateAdv}
                                name="checkedB"
                                color="primary"
                            />
                            </td>
                        </tr>

                        <tr>
                            <td style={{textAlign: `right`}}>Comedy</td>
                            <td style={{textAlign: `left`}}>
                            <Checkbox
                                checked={this.state.com}
                                onChange={this.updateCom}
                                name="checkedB"
                                color="primary"
                            />
                            </td>
                        </tr>

                        <tr>
                            <td style={{textAlign: `right`}}>Family</td>
                            <td style={{textAlign: `left`}}>
                            <Checkbox
                                checked={this.state.fam}
                                onChange={this.updateFam}
                                name="checkedB"
                                color="primary"
                            />
                            </td>
                        </tr>

                        <tr>
                            <td style={{textAlign: `right`}}>Horror</td>
                            <td style={{textAlign: `left`}}>
                            <Checkbox
                                checked={this.state.hor}
                                onChange={this.updateHor}
                                name="checkedB"
                                color="primary"
                            />
                            </td>
                        </tr>

                        <tr>
                            <td style={{textAlign: `right`}}>Science Fiction</td>
                            <td style={{textAlign: `left`}}>
                            <Checkbox
                                checked={this.state.scf}
                                onChange={this.updateScf}
                                name="checkedB"
                                color="primary"
                            />
                            </td>
                        </tr>
                        
                    </table>

                    <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    onClick={this.updateGenres}
                    >
                    Update
                    </Button>

                    <span id="update-genre-successful"> Preferences Updated Successfully!</span>
                    <span id="update-genre">Some error occurred</span>

                </div>

                </div>
            </div>
        );

    }

}

export default withStyles(styles, {withTheme: true})(Settings);

// 0: {id: 28, name: "Action"}
// 1: {id: 12, name: "Adventure"}
// 2: {id: 16, name: "Animation"}
// 3: {id: 35, name: "Comedy"}
// 4: {id: 80, name: "Crime"}
// 5: {id: 99, name: "Documentary"}
// 6: {id: 18, name: "Drama"}
// 7: {id: 10751, name: "Family"}
// 8: {id: 14, name: "Fantasy"}
// 9: {id: 36, name: "History"}
// 10: {id: 27, name: "Horror"}
// 11: {id: 10402, name: "Music"}
// 12: {id: 9648, name: "Mystery"}
// 13: {id: 10749, name: "Romance"}
// 14: {id: 878, name: "Science Fiction"}
// 15: {id: 10770, name: "TV Movie"}
// 16: {id: 53, name: "Thriller"}
// 17: {id: 10752, name: "War"}
// 18: {id: 37, name: "Western"}