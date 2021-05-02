import {Component} from 'react';
import './Details.css';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import config from '../config';

class DetailsPage extends Component{

    constructor(props){
        super(props);

        this.state={
            id: props.match.params.id,
            api_key: '',
            details: [],
            img_url: 'https://image.tmdb.org/t/p/w500',
            language: '',
            prd_img: '',
            prd: '',
            link: '',
        }

    }

    async componentDidMount(){

        await axios.get(`${config.config.SERVER_URI}/api/getapi`).then((e)=>{
            this.setState({
                api_key: ('?'+e.data[0].api)
            });
        });

        await fetch('https://api.themoviedb.org/3/movie/'+this.state.id+this.state.api_key+'&language=en-US').then(res=>res.json()).then((e)=>{
            this.setState({
                details: e
            });
        });
        this.setState({
            language: this.state.spoken_languages!==null && this.state.details.spoken_languages.length>0?(this.state.details.spoken_languages[0].english_name):('NA'),
            prd: this.state.production_companies!==null && this.state.details.production_companies.length>0?(this.state.details.production_companies[0].name):('NA'),
            prd_img: this.state.production_companies!==null && this.state.details.production_companies.length>0?(this.state.img_url+this.state.details.production_companies[0].logo_path):(''),
            link: this.state.homepage!==null && this.state.details.homepage.length>0?(this.state.details.homepage):('')
        });
    }

    render(){
        
        return (
            <div className="outside">
            <div className="main-content">
                <div className="title-movie">{this.state.details.original_title}</div>
                <div  style={{textAlign: `center`}}><img src={this.state.img_url+this.state.details.backdrop_path} height="400px"></img></div>
                <div className="tagline"><em>'{this.state.details.tagline}'</em></div>
                <div className="points-override">{this.state.details.vote_average}</div>
                <br />
                <div className="release-date">Release Date: <span style={{color: `white`}}>{this.state.details.release_date}</span></div>                             
                <br></br>
                <div className="release-date">Language: <span style={{color: `white`}}>{this.state.language}</span></div>
                <div className="release-date">Budget: <span style={{color: `white`}}>{this.state.details.budget===0?('NA'):('$'+this.state.details.budget)}</span></div>
                <div className="release-date">Revenue: <span style={{color: `white`}}>{this.state.details.revenue===0?('NA'):('$'+this.state.details.revenue)}</span></div>
                <div className="release-date">
                    <div>Production: <span style={{color: `white`}}>{this.state.prd}</span></div>
                    <div style={{marginTop: `10px`, marginBottom: `10px`}}><img src={this.state.prd_img} height="50px"></img></div>
                </div>
                <br></br>
                <div className="release-date">Official Website: {this.state.link!==''?(<Link href={this.state.link} target="_blank">{this.state.link}</Link>):('NA')}</div>
                <br></br>
                <br></br>
                <hr style={{height: `0px`, fontSize: `200px`, width: `90%`, marginBottom: `-60px`}}></hr>
                <div className="overview"><span style={{color: `#acacac`, fontSize: `28px`}}>Overview: <br /></span>{this.state.details.overview}</div>
                <br></br><br></br>
                </div>
            </div>
        );

    }

}
 
export default DetailsPage;