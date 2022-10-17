/*
 * Componente Name ??
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

import '../styleComponents/Name.css'

function Name(props){
    return(
        <div>
            <div className="titulo">{props.titulo}</div>
            <p className="descripcion">{props.descripcion}</p>
        </div>
    );
}

export default Name;