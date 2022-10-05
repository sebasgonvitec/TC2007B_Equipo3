import React from "react";
import SessionContext from "../SessionContext";
import { useContext } from "react";
import { useState } from "react"
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    
    const { updateSession, session } = useContext(SessionContext);
    const navigate = useNavigate();

    return(
        <body>
            <h1>Perfil</h1>
                <h4>Información Personal</h4>
                <p>Nombre: {session.nombre}</p>
                <p>Usuario: {session.usuario}</p>
                
                <h5>Privilegios de Visibilidad</h5>
                <p>Juicios Nulidad: {session.nulidad == "true" ? "si" : "no"}</p>
                <p>Carpetas de Investigación: {session.investigacion == "true" ? "si" : "no"}</p>
                <p>Expedientes Otros: {session.otros == "true" ? "si" : "no"}</p>

                <button onClick={() => {
                    updateSession(null);
                    navigate("/login");
                }}>logout</button><br/>
        </body>
    );
}

export default Profile;
