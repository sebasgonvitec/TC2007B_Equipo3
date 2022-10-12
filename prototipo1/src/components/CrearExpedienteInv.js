import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";


const URI = "https://localhost/crearExpedienteInv";
const logURI = "https://localhost/registrarActividad";

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // 0-11
let year = date.getFullYear();

function CrearExpedienteInv() {

    ReloadAlert();
    
    const { session } = useContext(SessionContext);

    const [state, setState] = useState({
        nombre: "",
        numero: "",
        carpeta_inv: "",
        denunciante: "",
        estatus: "",
        fecha: `${day}/${month}/${year}`,
    });
    
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(state.nombre.trim() !== ''){
                const formData = {
                    nombre:state.nombre,
                    numero:state.numero,
                    carpeta_inv:state.carpeta_inv,
                    denunciante:state.denunciante,
                    estatus:state.estatus,
                    fecha:state.fecha
                };

                setErrorMsg('');
                
                const logData = {usuario:session.nombre, fecha: new Date().toString(), accion: "Creó un expediente.", folio: state.numero, area: "Carpeta de Investigación"};

                await axios.post(logURI, logData, {
                headers:{
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('JWT_token')
                }
                });
                
                await axios.post(URI, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: localStorage.getItem('JWT_token'),
                    }
                });
        } else {
            setErrorMsg("Por favor, ingrese un nombre para el expediente");
        }
    } catch (error) {
        error.response && setErrorMsg(error.response.data);
    }}
    
    if(session != null)
    {
        return (
            <>
                <h1>Crear Expediente</h1>

                <div>
                    <form onSubmit={handleOnSubmit}>
                        {errorMsg && <p>{errorMsg}</p>}
                        <input type="text" name="nombre" onChange={handleInputChange} value={state.nombre} placeholder="Nombre del expediente" />
                        <input type="text" name="numero" onChange={handleInputChange} value={state.numero} placeholder="Numero del expediente" />
                        <input type="text" name="carpeta_inv" onChange={handleInputChange} value={state.carpeta_inv} placeholder="Expediente" />
                        <input type="text" name="denunciante" onChange={handleInputChange} value={state.denunciante} placeholder="Denunciante" />
                        <input type="text" name="estatus" onChange={handleInputChange} value={state.estatus} placeholder="Estatus" />
                        <button type="submit">Crear Expediente</button>
                    </form>
                </div>
            </>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default CrearExpedienteInv;
