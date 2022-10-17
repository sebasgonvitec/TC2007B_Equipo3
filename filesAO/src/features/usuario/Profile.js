/*
 * Pantalla perfil de un usuario
 *  
 * Autores:
 * - Andreína Isabel Sanánez
 * - Sebastián González
 * - Francisco Salcedo
 * - Regina Rodríguez
 * - Andrea Diego
 * 
 * 10/6/2022 
 * 
 */
import React from "react";
import { useContext } from "react";
// import axios from "axios";
import { useNavigate, Navigate } from 'react-router-dom';

import SessionContext from "../../context/SessionContext";
import ArchivosUsuario from "../usuario/ArchivosUsuario";
import ReloadAlert from "../components/Reload";

import "../styleComponents/Profile.css"
import Name from "../components/Name"
import { CgProfile } from "react-icons/cg";


const Profile = () => {

    ReloadAlert();
    
    const { updateSession, session } = useContext(SessionContext);
    const navigate = useNavigate();

    if(session != null)
    {
        return(
            <body style={{marginLeft:"5.8vw", marginRight:"5.8vw", marginBottom:"5vw"}}>
                <Name
                    titulo="Perfil"
                />

                <div className="infoContainer">
                    <div className='colorBoxArchivo' style={{background:'#8B2E87'}}>
                        <CgProfile className="icon" style={{width:'7vw', height:'auto'}}/>
                    </div>

                        <div className="infoPer">
                            <div style={{fontWeight:"bold", fontSize:"1.2vw", marginBottom:"1.5vw"}}>Informacion del Usuario</div>
                            <div> 
                                <span style={{fontWeight:"bold"}}>Nombre: </span> 
                                {session.nombre}
                            </div>
                            <div> 
                                <span style={{fontWeight:"bold"}}>Usuario: </span> 
                                {session.usuario}
                            </div>  
                        </div>

                        <div className="infoPer">
                            <div style={{fontWeight:"bold", fontSize:"1.2vw", marginBottom:"1.5vw"}}>Privilegios de Visibilidad</div>
                            <div> 
                                <span style={{fontWeight:"bold"}}>Juicios Nulidad: </span> 
                                {session.nulidad === "true" ? "Si" : "No"}
                            </div>
                            <div> 
                                <span style={{fontWeight:"bold"}}>Carpetas de Investigación: </span> 
                                {session.investigacion === "true" ? "Si" : "No"}
                            </div>
                            <div> 
                                <span style={{fontWeight:"bold"}}>Expedientes Otros: </span> 
                                {session.otros === "true" ? "Si" : "No"}
                            </div>
                        </div>

                </div>
                <div style={{fontWeight:"bold", fontSize:"1.2vw", marginBottom:"1.5vw"}}>Lista de Archivos Subidos</div>
                    <ArchivosUsuario></ArchivosUsuario>
                    <br></br>
    
                    <button id="btnLogout" onClick={() => {
                        updateSession(null); //borrar registro del front
                        navigate("/login");
                    }}>Cerrar Sesion</button><br/>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default Profile;
