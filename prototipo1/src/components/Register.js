
import React from "react";
import axios from "axios";
import { useState } from "react"
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";

const URI = "https://localhost/crearCuenta";

const Register = () => {
    
    const { session } = useContext(SessionContext);

    const [state, setState] = useState({
        usuario: "",
        password: "",
        nombre: "",
        area: "",
        nulidad: "false",
        investigacion: "false", //si se selecciona se cambia a true en el checkbox
        otros: "false",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
        console.log(state.nombre);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(state.usuario.trim() !== ''){
                const formData = {
                    usuario:state.usuario, 
                    password:state.password, 
                    nombre:state.nombre, 
                    area:state.area, 
                    nulidad:state.nulidad, 
                    investigacion:state.investigacion, 
                    otros:state.otros};

                console.log(formData);

                setErrorMsg('');
                await axios.post(URI, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: localStorage.getItem('JWT_token'),
                    }
                })
                  
        } else {
            setErrorMsg("Por favor llene todos los campos solicitados");
        }
    } catch (error) {
        error.response && setErrorMsg(error.response.data);
    }}

    if(session != null)
    {
        return(
            <body>
                <h1>Registrar Cuenta</h1>
                <form onSubmit={handleOnSubmit}>
                    <input type="text" name="nombre" onChange={handleInputChange} value={state.nombre} placeholder="Nombre Completo" required/><br/>
                    <input type="text" name="area" onChange={handleInputChange} value={state.area} placeholder="Area" required/><br/>
                    <input type="text" name="usuario" onChange={handleInputChange} value={state.usuario} placeholder="Usuario" id="usuario" required/><br/>
                    <input type="password" name="password" onChange={handleInputChange} value={state.password} placeholder="Contraseña" id="password" required/><br/>
                
                    <h4>Privilegios:</h4>
                    <input type="checkbox" name="nulidad" onChange={handleInputChange} value="true"/>Juicio de Nulidad<br/>
                    <input type="checkbox" name="investigacion" onChange={handleInputChange} value="true"/>Carpeta de Investigacion<br/>
                    <input type="checkbox" name="otros" onChange={handleInputChange} value="true"/>Expedientes Otros<br/>

                    <br/>
                    <button type="submit">Crear Cuenta</button><br/>
                </form>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default Register;
