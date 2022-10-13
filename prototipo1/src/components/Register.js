
import React from "react";
import axios from "axios";
import { useState } from "react"
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";
import "./styleComponents/Register.css"

import Name from "./Name"
import BackgroundRegister from "../img/backgroundRegister.png"

const URI = "https://localhost/crearCuenta";

const Register = () => {

    ReloadAlert();

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
            <div style={{backgroundImage: `url(${BackgroundRegister})`}}>
                <div style={{marginLeft:"5.8vw"}}>
                    <Name
                        titulo="Registrar Cuenta"
                    />
                </div>

                <form id="formRegister" onSubmit={handleOnSubmit}>
                    <p id="desciption"> Ingresa los datos para registrar una cuenta nueva </p>
                    <input type="text" name="nombre" onChange={handleInputChange} value={state.nombre} placeholder="Nombre Completo" id="nombre" required/><br/>
                    <input type="text" name="area" onChange={handleInputChange} value={state.area} placeholder="Area" id="area" required/><br/>
                    <input type="text" name="usuario" onChange={handleInputChange} value={state.usuario} placeholder="Usuario" id="usuarioR" required/><br/>
                    <input type="password" name="password" onChange={handleInputChange} value={state.password} placeholder="Contraseña" id="passwordR" required/><br/>
                    <h4>Privilegios:</h4>
                    <div className="privilegios">
                        <label id="labelForm">
                            <input type="checkbox" name="nulidad" onChange={handleInputChange} value="true"/>
                            Juicio de Nulidad
                        </label>
                        <label id="labelForm">
                            <input type="checkbox" name="investigacion" onChange={handleInputChange} value="true"/>
                            Carpeta de Investigacion
                        </label>
                        <label id="labelForm">
                            <input type="checkbox" name="otros" onChange={handleInputChange} value="true"/>
                            Expedientes Otros
                        </label>
                        
                        { /* <input type="checkbox" name="nulidad" onChange={handleInputChange} value="true"/>Juicio de Nulidad<br/>
                        <input type="checkbox" name="investigacion" onChange={handleInputChange} value="true"/>Carpeta de Investigacion<br/>
        <input type="checkbox" name="otros" onChange={handleInputChange} value="true"/>Expedientes Otros<br/> */}
                    </div>

                    <br/>
                    <button id="btnCuenta" type="submit">Crear Cuenta</button><br/>
                </form>
                <div style={{paddingBottom:"5.8vw", backgroundColor:" #8B2E87"}}></div>
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default Register;
