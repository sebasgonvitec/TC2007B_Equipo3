import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { parsePath, useLocation } from "react-router-dom";
import ReloadAlert from "./Reload";
import { useContext } from "react";
import SessionContext from "../SessionContext";
import { Link } from "react-router-dom"

import Name from "./Name"
import "./styleComponents/EditarUsuario.css"
import { BsChevronLeft } from "react-icons/bs";
import BackgroundRegister from "../img/backgroundRegister.png"


const URI = 'https://localhost/editarUsuario';
const logURI = 'https://localhost/registrarActividad';

function EditarUsuario(){

    ReloadAlert();
    
    const { state } = useLocation(); //Este state viene del componente anterior
    const { session } = useContext(SessionContext);
    const user = state.dataItem; 
    const [userData, setUserData] = useState({});

    useEffect( () => {
        getData()
    }, []);

    const getData = async () => {
        //console.log("ID del usuario:" + user._id);
        await axios({
            method: 'get',
            url: URI,
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('JWT_token'),
            },
            params: { id:user._id }
        }).then((res) =>{
            if(res.data !== null){
                setUserData(res.data);
            }else{
                setUserData(null);
            }}).catch((error) => {
                console.log(error);
            }
        )
    }
    
    const handleInputChange = (event) =>{
        //console.log("cambio de valor de checkbox" + event.target.checked);
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
        console.log(userData);
    }

    const handleInputChangeCheckbox = (event) =>{
        //console.log("cambio de valor de checkbox" + event.target.checked);
        setUserData({
            ...userData,
            [event.target.name]: event.target.checked.toString(),
        });
        console.log(userData);
    }
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(userData.usuario.trim() !== ''){
                const formData = {
                    usuario:userData.usuario, 
                    nombre:userData.nombre,
                    password:userData.password,
                    area:userData.area,
                    nulidad:userData.nulidad,
                    investigacion:userData.investigacion,
                    otros:userData.otros,};

                const logData = {usuario:session.nombre, fecha: new Date().toString(), accion: "Editó un usuario", folio: userData.usuario, area: "N/A"}

                    await axios.post(logURI, logData, {
                    headers:{
                        'Content-Type': 'application/json',
                        token: localStorage.getItem('JWT_token')
                    }
                    });

                console.log(formData);

                await axios.post(URI, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: localStorage.getItem('JWT_token'),
                    },
                    params: { id:user._id }
                }).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                });
            }else{
                console.log('Favor de llenar todos los campos');
            }
        }catch (error){
            console.log(error.response.data);
        }
    }
    return(
        <body style={{backgroundImage: `url(${BackgroundRegister})`}}>
            <div style={{marginLeft:"5.8vw", marginRight:"5.8vw"}}>
                <Name
                    titulo="Editar Usuario"
                />

                <Link to={"/portalAdmin"}  className="btnBack" style={{color: "#8B2E87"}}>
                    <BsChevronLeft style={{width:"2.5vw", height:"auto"}}/>
                    <div>Volver</div>

                </Link>
                <div className="editarForm">
                    <div style={{fontSize:"2vw", fontWeight:"bold"}}>Ingresa los datos a modificar</div>
                    <form id="formEditar" onSubmit={handleOnSubmit}>
                        <div className="datosContainer">
                            <div className="datosEditar">
                                <h3>Datos:</h3>
                                <input type="text" name="nombre" placeholder="Nombre Completo" value={userData.nombre} onChange={handleInputChange} id="inputEU" />
                                <input type="text" name="usuario" placeholder="Usuario" value={userData.usuario} onChange={handleInputChange} id="inputEU"/>
                                <input type="text" name="area" placeholder="Area" value={userData.area} onChange={handleInputChange} id="inputEU"/>
                            </div>
                            
                            <div className="privilegiosEU">
                                <h3 style={{marginBottom:"2vw"}} >Privilegios:</h3>
                                <input type="checkbox" name="nulidad" onChange={handleInputChangeCheckbox} id="inputCheckEU" />Juicio de Nulidad<br/>
                                <input type="checkbox" name="investigacion" onChange={handleInputChangeCheckbox} id="inputCheckEU" />Carpeta de Investigacion<br/>
                                <input type="checkbox" name="otros"  onChange={handleInputChangeCheckbox} id="inputCheckEU" />Expedientes Otros<br/>
                            </div>
                        </div>
                        
                        <div>
                            <h3>Cambio de Contraseña</h3>
                            <p>Ingrese la contraseña solo si desea cambiarla</p>
                            <input type="password" name="password" onChange={handleInputChange} placeholder="Nueva Contraseña" id="inputEU" />
                        </div>

                        <br/>
                        <div className="btnContainer">
                            <button id="btnGuardar" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>

                <div style={{padding:"2.5vw", background:"#8B2E87"}}></div>
                
            </div>
        </body>
    );
}

export default EditarUsuario;