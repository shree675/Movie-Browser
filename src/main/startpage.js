import {Component} from 'react';
import './mainpage.css';
import axios from 'axios';
import ButtonAppBar from './Navbar';
import movieicon from '../Assets/movieicon.svg';

class StartPage extends Component {

    constructor(props){
        super(props);

        this.state={
            username: '',
            password: '',
            users: [],
            passwords: [],
            base_url: 'https://api.themoviedb.org/3',
            api_key: '&api_key=a39afca7618243991f7cf64e46955ba5',
            popular: '/discover/movie?sort_by=popularity.desc',
            img_url: 'https://image.tmdb.org/t/p/w500',
            popular_results: [],
        }

    }

    render(){
        return (
            <div style={{width: `100%`}}>

                <ButtonAppBar />                        

                <div style={{textAlign: `center`}}>
                    <img src={movieicon} height="250px"></img>
                    <br></br>
                    <div style={{fontSize: `30px`, fontWeight: `bold`, color: `#acacac`}}>Welcome to Movie Browser</div>
                    <div style={{fontSize: `18px`, color: `#acacac`, paddingTop: `28px`, paddingLeft: `100px`, paddingRight: `100px`}}>Get started by clicking on LOGIN</div>
                    <div style={{fontSize: `18px`, color: `#acacac`, padding: `5px`, paddingLeft: `100px`, paddingRight: `100px`}}>If this is your first time, then sign up for Movie Browser by clicking on SIGN UP</div>
                    <div style={{fontSize: `18px`, color: `#acacac`, padding: `0px`, paddingLeft: `100px`, paddingRight: `100px`}}>You can change your prefernces in the Settings page upon login</div>
                </div>

            </div>
        );
    }

}

export default StartPage;