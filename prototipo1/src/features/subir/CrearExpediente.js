/*
 * Componente Creacion de Expedientes de Nulidad
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
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from 'react-router-dom';

import SessionContext from "../../context/SessionContext";
import ReloadAlert from "../components/Reload";
import Name from "../components/Name"

import "../styleComponents/CrearExpediente.css"
import { AiOutlineFolder } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import swal from "sweetalert";

const URI = "https://localhost/crearExpedienteNul";
const logURI = "https://localhost/registrarActividad";


const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // 0-11
let year = date.getFullYear();

function CrearExpediente() {

    ReloadAlert();
    
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    const [state, setState] = useState({
        numero: "",
        expediente: "",
        salaTja: "",
        actor: "",
        demandadas: "",
        materia: "",
        domicilio: "",
        actoImpugnado: "",
        estatusJuridico: "",
        ultimoEstadoProcesal: "",
        fecha: `${day}/${month}/${year}`,
    });
    

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(state.numero.trim() !== ''){
                const formData = {
                    numero:state.numero,
                    expediente:state.expediente,
                    salaTja:state.salaTja,
                    actor:state.actor,
                    demandadas:state.demandadas,
                    materia:state.materia,
                    domicilio:state.domicilio,
                    actoImpugnado:state.actoImpugnado,
                    estatusJuridico:state.estatusJuridico,
                    fecha:state.fecha
                };
                //console.log(formData);
                

                const logData = {usuario:session.nombre, fecha: new Date().toLocaleString(), accion: "Creó un expediente.", folio: state.numero, area: "Juicio de Nulidad"}

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
                }).then(res=>{
                    if(res.data.msg === "Expediente creado"){
                        swal(res.data.msg, "", "success").then(()=>{
                            navigate(-1);
                        })
                    }else{
                        swal("Error al crear el expediente", "", "error").then(()=>{
                            navigate(-1);
                        })
                    }
                });
        } else {
            swal("Por favor, ingrese un numero para el expediente", "", "warning")
        }
    } catch (error) {
        swal("Error al crear el expediente", "Intentelo nuevamente", "error")
        console.log("entro al error " + error);
    }}
    
    if(session != null)
    {
        return (
            <div>
                <div style={{marginLeft:"5.8vw"}}>
                    <Name 
                        titulo="Crear Expediente - Juicio de Nulidad"
                        descripcion="Ingresa los datos para crear un expediente"                        
                    />
                    <Link to={"/subir"}  className="btnBack" style={{color: "#8B2E87"}}>
                        <BsChevronLeft style={{width:"2.5vw", height:"auto"}}/>
                        <div>Volver</div>

                    </Link>
                </div>
                <div className="containerForm">
                    <form id="formCrearExp" onSubmit={handleOnSubmit} >
                        <div id="tituloCrearExp">Ingresa los datos</div>
                        <input type="text" name="numero" onChange={handleInputChange} value={state.numero} placeholder="Numero del expediente" id="inputCE" required/>
                        <input type="text" name="expediente" onChange={handleInputChange} value={state.expediente} placeholder="Expediente" id="inputCE" required/>
                        <input type="text" name="salaTja" onChange={handleInputChange} value={state.salaTja} placeholder="Sala del TJA" id="inputCE"/>
                        <input type="text" name="actor" onChange={handleInputChange} value={state.actor} placeholder="Actor" id="inputCE" />
                        <input type="text" name="demandadas" onChange={handleInputChange} value={state.demandadas} placeholder="Demandadas" id="inputCE" />
                        <input type="text" name="materia" onChange={handleInputChange} value={state.materia} placeholder="Materia" id="inputCE" />
                        <input type="text" name="domicilio" onChange={handleInputChange} value={state.domicilio} placeholder="Domicilio" id="inputCE" />
                        <input type="text" name="actoImpugnado" onChange={handleInputChange} value={state.actoImpugnado} placeholder="Acto Impugnado" id="inputCE" />
                        <input type="text" name="estatusJuridico" onChange={handleInputChange} value={state.estatusJuridico} placeholder="Estatus Juridico" id="inputCE" required/>
                        <button id="btnCrearExp" type="submit">Crear Expediente</button>
                    </form>
                    <div className='colorBoxExp' style={{background:'#45B2E6'}}>
                        {<AiOutlineFolder className="icon" style={{width:'13vw', height:'auto'}}/>}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default CrearExpediente;
