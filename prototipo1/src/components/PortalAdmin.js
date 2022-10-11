import React from "react";
import { useContext } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";

function PortalAdmin(){

    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    ReloadAlert();

    if(session != null)
    {

        return(
            <div>
                <h1>Portal Administrador</h1>
                <button onClick={() =>{
                    navigate('/registro')
                }}>Registro de Usuarios</button>
                <button onClick={() =>{
                    navigate('/registro')
                }}>Bitacora de Actividad</button>
                <button onClick={() =>{
                    navigate('/tablaUsuarios')
                }}>Editar usuarios</button>
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default PortalAdmin;