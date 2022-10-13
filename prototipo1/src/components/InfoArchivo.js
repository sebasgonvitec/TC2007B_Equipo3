import "./styleComponents/InfoArchivo.css"
import { AiOutlineFolder } from "react-icons/ai";

function InfoArchivo(props){
    return(
        <div>
            <div className="infoSubir">
                <div className='colorBoxArchivo' style={{background:'#45B2E6'}}>
                    <AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>
                </div>
                <div className="infoContent">
                    <p style={{fontWeight:"bold", fontSize:"1.5vw"}}>Informacion del expediente</p>
                    <div> 
                        <span style={{fontWeight:"bold"}}>Nombre: </span> 
                        {props.nombre}
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}> Numero: </span>
                        {props.numero}
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}>Expediente: </span> 
                        {props.expediente}
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}> Actor: </span> 
                        {props.actor}
                    </div>
                </div>
            </div> 

    </div>
    );
}

export default InfoArchivo;