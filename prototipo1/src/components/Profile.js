import React from "react";
import SessionContext from "../SessionContext";
// import axios from "axios";
import { useContext } from "react";
import ArchivosUsuario from "./ArchivosUsuario";
import { useNavigate, Navigate } from 'react-router-dom';
import ReloadAlert from "./Reload";


const Profile = () => {

    ReloadAlert();
    
    const { updateSession, session } = useContext(SessionContext);
    const navigate = useNavigate();

    if(session != null)
    {
        return(
            <body>
                <h1>Perfil</h1>
                    <h4>Información Personal</h4>
                    <p>Nombre: {session.nombre}</p>
                    <p>Usuario: {session.usuario}</p>
                    
                    <h5>Privilegios de Visibilidad</h5>
                    <p>Juicios Nulidad: {session.nulidad === "true" ? "si" : "no"}</p>
                    <p>Carpetas de Investigación: {session.investigacion === "true" ? "si" : "no"}</p>
                    <p>Expedientes Otros: {session.otros === "true" ? "si" : "no"}</p>

                    <ArchivosUsuario></ArchivosUsuario>
                    <br></br>
    
                    <button onClick={() => {
                        updateSession(null); //borrar registro del front
                        navigate("/login");
                    }}>logout</button><br/>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default Profile;
