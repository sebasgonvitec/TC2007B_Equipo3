/*
 * Componente tarjeta de informacion de un expediente
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

import "../styleComponents/InfoArchivo.css"
import { AiOutlineFolder } from "react-icons/ai";

function InfoArchivo(props){
    if(props.fecha !== undefined){
    return(
        <div>
            <div className="infoSubir">
                <div className='colorBoxArchivo' style={{background:'#45B2E6'}}>
                    <AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>
                </div>
                <div className="infoContent">
                    <p style={{fontWeight:"bold", fontSize:"1.5vw"}}>Informacion del expediente</p>
                    <div>
                        {props.expediente != null && <span style={{fontWeight:"bold"}}>Expediente: {<span style={{fontWeight:"normal"}}>{props.expediente}</span>}</span>}
                        {props.carpeta_inv != null && <span style={{fontWeight:"bold"}}>Carpeta de Investigacion: {<span style={{fontWeight:"normal"}}>{props.carpeta_inv}</span>}</span>}
                    </div>
                    <div> 
                        <span style={{fontWeight:"bold"}}>Numero: </span> 
                        {props.numero}
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}>Fecha: </span> 
                        {props.fecha}
                    </div>
                    <div>
                        {props.estatusJuridico != null && <span style={{fontWeight:"bold"}}>Estatus Juridico: {<span style={{fontWeight:"normal"}}>{props.estatusJuridico}</span>}</span>}
                        {props.estado != null && <span style={{fontWeight:"bold"}}>Último estado procesal: {<span style={{fontWeight:"normal"}}>{props.estado}</span>}</span>}
                    </div>
                </div>
            </div> 
        </div>
    );
    }else{
        return(
            <div>
            <div className="infoSubir">
                <div className='colorBoxArchivo' style={{background:'#45B2E6'}}>
                    <AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>
                </div>
                <div className="infoContent">
                    <p style={{fontWeight:"bold", fontSize:"1.5vw"}}>Otros Folios</p>
                </div>
            </div> 
        </div>
        );
    }
}

export default InfoArchivo;