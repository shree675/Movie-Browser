import './card.css';
import Link from '@material-ui/core/Link';

const Card = (props) => {

    return (
        <Link style={{textDecoration: `none`}} href={'/'+props.id} target="_blank">       
            <div style={{width: `520px`, textAlign: `center`}}>
            <div className="image">
            <img src={props.image} width="520px" height="300px"></img>
            </div>
            <div className="movie-label">{props.moviename}</div>                
            </div>
        </Link>
    );
}
 
export default Card;