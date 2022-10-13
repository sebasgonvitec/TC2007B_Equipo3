import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";


const URI = "https://localhost/crearExpedienteInv";

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // 0-11
let year = date.getFullYear();

function CrearExpedienteInv() {

    ReloadAlert();
    
    const { session } = useContext(SessionContext);

    const [state, setState] = useState({
        numero: "",
        eco: "",
        carpeta_inv: "",
        denunciante: "",
        imputado: "",
        delito: "",
        lugarHechos: "",
        objetoDelito: "",
        estado: "",
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
                    numero:state.numero,
                    eco:state.eco,
                    carpeta_inv:state.carpeta_inv,
                    denunciante:state.carpeta_inv,
                    imputado:state.imputado,
                    delito:state.delito,
                    lugarHechos:state.lugarHechos,
                    objetoDelito:state.objetoDelito,
                    estado:state.estado,
                    fecha:state.fecha,
                };

                setErrorMsg('');
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
                        <input type="text" name="numero" onChange={handleInputChange} value={state.numero} placeholder="Numero del expediente" />
                        <input type="text" name="eco" onChange={handleInputChange} value={state.eco} placeholder="ECO" />
                        <input type="text" name="carpeta_inv" onChange={handleInputChange} value={state.carpeta_inv} placeholder="Carpeta de Investigacion" />
                        <input type="text" name="denunciante" onChange={handleInputChange} value={state.denunciante} placeholder="Denunciante" />
                        <input type="text" name="imputado" onChange={handleInputChange} value={state.imputado} placeholder="Imputado" />
                        <input type="text" name="delito" onChange={handleInputChange} value={state.delito} placeholder="Delito" />
                        <input type="text" name="lugarHechos" onChange={handleInputChange} value={state.lugarHechos} placeholder="Lugar de los hechos" />
                        <input type="text" name="objetoDelito" onChange={handleInputChange} value={state.objetoDelito} placeholder="Objeto del delito" />
                        <input type="text" name="estado" onChange={handleInputChange} value={state.estado} placeholder="Estado" />

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