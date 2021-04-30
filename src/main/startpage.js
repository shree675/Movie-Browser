import {Component} from 'react';
import './mainpage.css';
import axios from 'axios';
import ButtonAppBar from './Navbar';
import AwesomeSlider from 'react-awesome-slider';
// import AwsSliderStyles from 'react-awesome-slider/src/styles.scss';
import 'react-awesome-slider/dist/styles.css';

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

    // async componentDidMount(){
        // await fetch(this.state.base_url+this.state.popular+this.state.api_key).then(res=>res.json()).then(data=>{
        //     this.setState({
        //         popular_results: data.results.map((e)=>e)
        //     });
        // });
        // console.log(this.state.popular_results);
    // };

    render(){
        return (
            <div style={{width: `100%`}}>

                <ButtonAppBar />                        

                <div>
                    this is the start page
                </div>

            </div>
        );
    }

}

export default StartPage;