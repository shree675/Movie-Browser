import './card.css';

const Card = (props) => {

    return (
        <div style={{width: `520px`, textAlign: `center`}}>
            <div className="image">
            <img src={props.image} width="520px" height="300px"></img>
            </div>
            <div className="movie-label">{props.moviename}</div>
        </div>
    );
}
 
export default Card;