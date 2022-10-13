import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { parsePath, useLocation } from "react-router-dom";
import ReloadAlert from "./Reload";
import { useContext } from "react";
import SessionContext from "../SessionContext";

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
        <>
            <h1>Editar Usuario</h1>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} />
                    <input type="text" name="usuario" value={userData.usuario} onChange={handleInputChange} />
                    <input type="text" name="area" value={userData.area} onChange={handleInputChange} />
                    
                    <h4>Privilegios:</h4>
                    <input type="checkbox" name="nulidad" onChange={handleInputChangeCheckbox} />Juicio de Nulidad<br/>
                    <input type="checkbox" name="investigacion" onChange={handleInputChangeCheckbox} />Carpeta de Investigacion<br/>
                    <input type="checkbox" name="otros"  onChange={handleInputChangeCheckbox} />Expedientes Otros<br/>

                    <h4>Cambio de Contraseña</h4>
                    <p>Ingrese una la contraseña solo si desea cambiarla</p>
                    <input type="password" name="password" onChange={handleInputChange} placeholder="Nueva Contraseña" />

                    <br/>
                    <button type="submit">Guardar</button>
                </form>
            </div>
            
        </>
    );
}

export default EditarUsuario;