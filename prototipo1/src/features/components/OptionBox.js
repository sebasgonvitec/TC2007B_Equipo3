/*
 * Componente caja de opcion en el menu
 *  
 * Autores:
 * - Andreína Isabel Sanánez
 * - Sebastián González
 * - Francisco Salcedo
 * - Andrea Diego
 * - Regina Rodríguez
 * 
 * 10/6/2022 
 * 
 */

import '../styleComponents/OptionBox.css'
import Btn from './Btn'

function OptionBox(props){
    return(
        <div className="container">
            {props.colorboxOption}
            <div className="content">
                <p style={{fontWeight:'700', fontSize:'1.2vw'}} >{props.titulo}</p>
                <p style={{fontSize:'1vw'}}>{props.descripcion}</p>
                <Btn
                    onClick={props.onClick}
                    name="Seleccionar"/>
            </div>
        </div>
    );
}
export default OptionBox;