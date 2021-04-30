import './Template.css';
import Link from '@material-ui/core/Link';

const Template = (props) => {
    return (
        <span style={{float: `left`, marginLeft: `10px`, marginRight: `10px`, marginBottom: `50px`}}>            
            <img src={props.image} height="200px" width="350px"></img>
            <div className="content">
                <div className="title">{props.title}</div>                                               
                <div className="date">Release Date: <span style={{fontWeight: `600`}}>{props.date}</span></div>&nbsp;
                <div className="points">{props.points}</div>&nbsp;
                <div className="link"><Link style={{textDecoration: `none`}} href={'/'+props.id}>SEE MORE</Link></div>
            </div>
            <br></br>
        </span>
    );
}
 
export default Template;