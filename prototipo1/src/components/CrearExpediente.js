import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";


const URI = "https://localhost/crearExpedienteNul";
const logURI = "https://localhost/registrarActividad";


const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // 0-11
let year = date.getFullYear();

function CrearExpediente() {

    ReloadAlert();
    
    const { session } = useContext(SessionContext);

    const [state, setState] = useState({
        nombre: "",
        numero: "",
        expediente: "",
        actor: "",
        estatus: "",
        fecha: `${day}/${month}/${year}`,
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
            if(state.nombre.trim() !== ''){
                // const formData = new FormData();
                // formData.append('nombre', state.nombre);
                // formData.append('numero', state.numero);
                // formData.append('expediente', state.expediente);
                // formData.append('actor', state.actor);
                // formData.append('estatus', state.estatus);
                const formData = {nombre:state.nombre, numero:state.numero, expediente:state.expediente, actor:state.actor, estatus:state.estatus, fecha:state.fecha};
                console.log(formData);

                setErrorMsg('');
                

                const logData = {usuario:session.nombre, fecha: new Date().toString(), accion: "Creó un expediente.", folio: state.numero, area: "N/A"}

                await axios.post(logURI, formData, {
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
                        <input type="text" name="expediente" onChange={handleInputChange} value={state.expediente} placeholder="Expediente" />
                        <input type="text" name="actor" onChange={handleInputChange} value={state.actor} placeholder="Actor" />
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

export default CrearExpediente;
