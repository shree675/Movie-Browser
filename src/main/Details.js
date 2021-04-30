import {Component} from 'react';
import './Details.css';

class DetailsPage extends Component{

    constructor(props){
        super(props);

        this.state={
            id: props.match.params.id,
            api_key: '?api_key=a39afca7618243991f7cf64e46955ba5',
            details: [],
            img_url: 'https://image.tmdb.org/t/p/w500',
            language: '',
            prd_img: '',
            prd: '',
        }

    }

    async componentDidMount(){
        await fetch('https://api.themoviedb.org/3/movie/'+this.state.id+this.state.api_key+'&language=en-US').then(res=>res.json()).then((e)=>{
            this.setState({
                details: e
            });
        });
        console.log(this.state.details);
        this.setState({
            language: this.state.details.spoken_languages.length>0?(this.state.details.spoken_languages[0].english_name):('NA'),
            prd: this.state.details.production_companies.length>0?(this.state.details.production_companies[0].name):('NA'),
            prd_img: this.state.details.production_companies.length>0?(this.state.details.production_companies[0].url):(''),
        });
    }

    render(){
        
        return (
            <div className="main-content">
                <div className="title-movie">{this.state.details.original_title}</div>
                <img src={this.state.img_url+this.state.details.backdrop_path} height="500px"></img>
                <div className="tagline">{this.state.details.tagline}</div>
                <div className="release-date">{this.state.details.release_date}</div>
                <div className="points-override">{this.state.details.vote_average}</div>                
                <div>Language: {this.state.language}</div>
                <div className="budget">Budget: {this.state.details.budget===0?('NA'):('$'+this.state.details.budget)}</div>
                <div className="budget">Revenue: {this.state.details.revenue===0?('NA'):('$'+this.state.details.revenue)}</div>
                <div className="production">
                    Production: {this.state.prd}
                    <img src={this.state.prd_img}></img>
                </div>
                <div className="overview">Overview: {this.state.details.overview}</div>
            </div>
        );

    }

}
 
export default DetailsPage;