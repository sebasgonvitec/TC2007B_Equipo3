import './styleComponents/Btn.css'
import { Link } from "react-router-dom"

function Btn(props){
    return(
        <div >
            {/* <Link to={props.page} > */}
                <div className="button" onClick={props.onClick}>{props.name}</div>
            {/* </Link> */}
        </div>
    );
}

export default Btn;