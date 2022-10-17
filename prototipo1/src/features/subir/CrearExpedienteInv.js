/*
 * Componente Creacion de Expedientes de Carpeta de Investigación
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
import { BsArchive } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import swal from "sweetalert";


const URI = "https://localhost/crearExpedienteInv";
const logURI = "https://localhost/registrarActividad";

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // 0-11
let year = date.getFullYear();

function CrearExpedienteInv() {

    ReloadAlert();
    
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();
    
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
            if(state.numero.trim() !== ''){
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
                //console.log(formData);

                setErrorMsg('');
                
                const logData = {usuario:session.nombre, fecha: new Date().toLocaleString(), accion: "Creó un expediente.", folio: state.numero, area: "Carpeta de Investigación"};

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
                setErrorMsg("Por favor, ingrese un nombre para el expediente");
                swal("Por favor, ingrese un numero para el expediente", "", "warning")
        }
    } catch (error) {
        error.response && setErrorMsg(error.response.data);
        swal("Error al crear el expediente", "Intentelo nuevamente", "error")
        console.log("entro al error")
    }}
    
    if(session != null)
    {
        return (
            <div>
                <div style={{marginLeft:"5.8vw"}}>
                    <Name 
                        titulo="Crear Expediente - Carpeta de Investigación"
                        descripcion="Ingresa los datos para crear un expediente"
                    />
                
                    <Link to={"/subirInv"}  className="btnBack" style={{color: "#8B2E87"}}>
                                <BsChevronLeft style={{width:"2.5vw", height:"auto"}}/>
                                <div>Volver</div>
                    </Link>
                </div>

                <div className="containerForm">
                    <form id="formCrearExp" onSubmit={handleOnSubmit}>
                        <div id="tituloCrearExp">Ingresa los datos</div>
                        {errorMsg && <p>{errorMsg}</p>}
                        <input type="text" name="numero" onChange={handleInputChange} value={state.numero} placeholder="Numero del expediente" id="inputCE" required/>
                        <input type="text" name="eco" onChange={handleInputChange} value={state.eco} placeholder="ECO" id="inputCE"/>
                        <input type="text" name="carpeta_inv" onChange={handleInputChange} value={state.carpeta_inv} placeholder="Carpeta de Investigacion" id="inputCE" required/>
                        <input type="text" name="denunciante" onChange={handleInputChange} value={state.denunciante} placeholder="Denunciante" id="inputCE"/>
                        <input type="text" name="imputado" onChange={handleInputChange} value={state.imputado} placeholder="Imputado" id="inputCE"/>
                        <input type="text" name="delito" onChange={handleInputChange} value={state.delito} placeholder="Delito" id="inputCE"/>
                        <input type="text" name="lugarHechos" onChange={handleInputChange} value={state.lugarHechos} placeholder="Lugar de los hechos" id="inputCE"/>
                        <input type="text" name="objetoDelito" onChange={handleInputChange} value={state.objetoDelito} placeholder="Objeto del delito" id="inputCE" />
                        <input type="text" name="estado" onChange={handleInputChange} value={state.estado} placeholder="Estado" id="inputCE" required/>

                        <button id="btnCrearExp" type="submit">Crear Expediente</button>
                    </form>
                    <div className="colorBoxExp" style={{background:'#FFA928'}}>
                        {<BsArchive className="icon" style={{width:'11vw', height:'auto'}}/>}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default CrearExpedienteInv;
