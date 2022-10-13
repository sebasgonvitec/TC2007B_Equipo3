import './styleComponents/OptionBox.css'
import Btn from './Btn'
import { AiOutlineFolder } from "react-icons/ai";

function OptionBox(props){
    return(
        <div className="container">
            {props.colorboxOption}
            <div className="content">
                <p style={{fontWeight:'700', fontSize:'1.2vw'}} >{props.titulo}</p>
                <p style={{fontSize:'1vw'}}>{props.descripcion}</p>
                <Btn
                    page={props.page}
                    name="Seleccionar"/>
            </div>
        </div>
    );
}
export default OptionBox;