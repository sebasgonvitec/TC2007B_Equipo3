import React from "react";
import { useNavigate } from 'react-router-dom';

function PortalAdmin(){
    const navigate = useNavigate();

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

export default PortalAdmin;