import './styleComponents/OptionBox.css'
import Btn from './Btn'
import { AiOutlineFolder } from "react-icons/ai";

function OptionBox(props){
    return(
        <div className="container">
            <div style={{width:"13.8vw", height:"25vw", background:"#45B2E6"}}>
                <AiOutlineFolder />
            </div>
            <div className="content">
                <p>{props.titulo}</p>
                <p>{props.descripcion}</p>
                <Btn name="Seleccionar"/>
            </div>
        </div>
    );
}
export default OptionBox;