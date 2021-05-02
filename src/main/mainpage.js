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
import Carousel2 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import config from '../config';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
            api_key: '',
            upcoming: '/movie/upcoming',
            img_url: 'https://image.tmdb.org/t/p/w500',
            popular_results: [],
            movies: [],
            actmovies: [],
            advmovies: [],
            commovies: [],
            fammovies: [],
            hormovies: [],
            scfmovies: [],
            prefgens: [],
            prefmovies: [],
        }

        this.onChangeSearchMain=this.onChangeSearchMain.bind(this);

    }

    async componentDidMount(){

        await axios.get(`${config.config.SERVER_URI}/api/getapi`).then((e)=>{
            this.setState({
                api_key: ('?'+e.data[0].api)
            });
        });

        (this.state.api_key==='')?(console.log()):(
            await fetch(this.state.base_url+this.state.upcoming+this.state.api_key+'&language=en-US&page=1').then(res=>res.json()).then(data=>{
                this.setState({
                    popular_results: data.results.map((e)=>e)
                });
            })
        );
        
        await axios.get(`${config.config.SERVER_URI}/pref/allpreferences`).then((e)=>{
            e.data.map(user=>{
                if(user.username===this.state.username){                    
                    this.setState({
                        prefgens: user.genre
                    });
                }
            })
        });

        for(var i=0;i<this.state.prefgens.length;i++){
            if(this.state.prefgens[i]===28){
                await fetch(this.state.base_url+'/discover/movie'+this.state.api_key+'&with_genres='+'28').then(res=>res.json()).then(data=>{
                    this.setState({
                        actmovies: data.results.map((e)=>e)
                    });
                });
            }
            else if(this.state.prefgens[i]===12){
                await fetch(this.state.base_url+'/discover/movie'+this.state.api_key+'&with_genres='+'12').then(res=>res.json()).then(data=>{
                    this.setState({
                        advmovies: data.results.map((e)=>e)
                    });
                });
            }
            else if(this.state.prefgens[i]===35){
                await fetch(this.state.base_url+'/discover/movie'+this.state.api_key+'&with_genres='+'35').then(res=>res.json()).then(data=>{
                    this.setState({
                        commovies: data.results.map((e)=>e)
                    });
                });
            }
            else if(this.state.prefgens[i]===10751){
                await fetch(this.state.base_url+'/discover/movie'+this.state.api_key+'&with_genres='+'10751').then(res=>res.json()).then(data=>{
                    this.setState({
                        fammovies: data.results.map((e)=>e)
                    });
                });
            }
            else if(this.state.prefgens[i]===27){
                await fetch(this.state.base_url+'/discover/movie'+this.state.api_key+'&with_genres='+'27').then(res=>res.json()).then(data=>{
                    this.setState({
                        hormovies: data.results.map((e)=>e)
                    });
                });
            }
            else if(this.state.prefgens[i]===878){
                await fetch(this.state.base_url+'/discover/movie'+this.state.api_key+'&with_genres='+'878').then(res=>res.json()).then(data=>{
                    this.setState({
                        scfmovies: data.results.map((e)=>e)
                    });
                });
            }
        }

        this.setState({
            prefmovies: this.state.actmovies.concat(this.state.advmovies,this.state.commovies,this.state.fammovies,this.state.hormovies,this.state.scfmovies)
        });

    };

    async onChangeSearchMain(props){
        await this.setState({
            searchquery: props
        });
        if(this.state.searchquery.length===0){
            document.getElementById("default").style.display="block";
            document.getElementById("search-results").style.display="none";
        }
        else{
            document.getElementById("default").style.display="none";
            document.getElementById("search-results").style.display="block";
            await fetch('https://api.themoviedb.org/3/search/movie'+this.state.api_key+'&language=en-US&query='+this.state.searchquery+'&page=1&include_adult=false').then(res=>res.json()).then(data=>{            
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

                <div>
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

                    <br></br>
                    <br></br>

                </div>                                        

                <div className="card">

                <div className="most-popular">Upcoming Movies</div>
                
                {(this.state.popular_results.length>0)?(
                    <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    dynamicHeight={true}
                    width="520px"
                    className="card"                       
                    >
                    {this.state.popular_results.map((e)=>(
                        <Card moviename={e.original_title} image={this.state.img_url+e.backdrop_path} id={e.id} />
                    ))}
                    </Carousel>
                ):(null)}
                </div>

                </div>

                <div className="genre-movies">
                    <div className="top-picks">Movies Picked For You:</div>
                <Carousel2
                responsive={responsive}
                centerMode={true}
                >
                {this.state.prefmovies.map((e)=>(
                    <Template image={this.state.img_url+e.backdrop_path} title={e.original_title} points={e.vote_average} date={e.release_date} id={e.id} />
                ))}
                </Carousel2>
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