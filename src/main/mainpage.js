import {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './card.css';
import './mainpage.css';
import axios from 'axios';
import Card from './card';
import SearchAppBar from './Searchbar';
import usericon from '../Assets/usericon.svg';
import Link from '@material-ui/core/Link';
import Template from './Template';

class MainPage extends Component{

    constructor(props){
        super(props);

        this.state={
            username: window.name,
            password: '',
            users: [],
            passwords: [],
            searchquery: '',
            base_url: 'https://api.themoviedb.org/3',
            api_key: '&api_key=a39afca7618243991f7cf64e46955ba5',
            popular: '/discover/movie?sort_by=popularity.desc',
            img_url: 'https://image.tmdb.org/t/p/w500',
            popular_results: [],
            movies: []
        }

        this.onChangeSearchMain=this.onChangeSearchMain.bind(this);

    }

    async componentDidMount(){
        await fetch(this.state.base_url+this.state.popular+this.state.api_key).then(res=>res.json()).then(data=>{
            this.setState({
                popular_results: data.results.map((e)=>e)
            });
        });    
    };

    async onChangeSearchMain(props){
        await this.setState({
            searchquery: props
        });
        // console.log(this.state.searchquery);
        if(this.state.searchquery.length===0){
            document.getElementById("default").style.display="block";
            document.getElementById("search-results").style.display="none";
        }
        else{
            document.getElementById("default").style.display="none";
            document.getElementById("search-results").style.display="block";
            await fetch('https://api.themoviedb.org/3/search/movie?api_key=a39afca7618243991f7cf64e46955ba5&language=en-US&query='+this.state.searchquery+'&page=1&include_adult=false').then(res=>res.json()).then(data=>{            
                this.setState({
                    movies: data.results.map((e)=>e)
                });
            });
            console.log(this.state.movies);
        }      
    }

    render(){

        return (

            <div style={{width: `100%`}}>

                <SearchAppBar onChangeSearchMain={this.onChangeSearchMain} />

                <div id="default">

                <div className="welcome-user">
                    <div>
                        <img src={usericon}></img>
                    </div>
                    <div>
                    Welcome,
                    </div>
                    <div style={{opacity: 0.6}} >
                    {this.state.username}
                    </div>
                    <hr style={{marginBottom: `2px`, fontSize: `20px`, width: `80%`}} ></hr>
                    <div style={{fontSize: `18px`}} >
                        <Link href="/">Sign Out</Link> |
                        <Link href="/usersettings"> Settings</Link>
                    </div>

                </div>                                        

                <div className="card">

                <div className="most-popular">Popular Movies</div>
                
                {(this.state.popular_results.length>0)?(
                    <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    dynamicHeight={true}
                    width="520px"
                    className="card"                       
                    >
                    {this.state.popular_results.map((e)=>(
                        <Card moviename={e.original_title} image={this.state.img_url+e.backdrop_path} />
                    ))}
                    </Carousel>
                ):(null)}
                
                </div>

            </div>

            <div id="search-results">
                <div style={{fontSize: `20px`, color: `grey`}}>Search Results:</div>
                <br></br>
                <div>
                {this.state.movies.map((e)=>(
                    <Template image={this.state.img_url+e.backdrop_path} title={e.original_title} points={e.vote_average} date={e.release_date} id={e.id} />
                ))}
                {(this.state.movies.length===0)?(
                    <div className="no-matches">
                        ----No matches found----
                    </div>
                ):(null)}
            </div>
            </div>
            
            </div>

        );

    }

}

export default MainPage