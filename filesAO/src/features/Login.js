/*
 * Pantalla de Login de la aplicación
 *  
 * Autores:
 * - Andreína Isabel Sanánez
 * - Sebastián González
 * - Francisco Salcedo
 * - Andrea Diego
 * - Regina Rodríguez
 * 
 * 10/6/2022 
 * 
 */
import React from "react";
import { useContext, useState } from "react";
import axios from "axios";
import SessionContext from "../context/SessionContext";
import { useNavigate } from 'react-router-dom';

import "./styleComponents/Login.css"
import LogoAo from "../img/logo_ao.png"
import BackgroundLogin from "../img/backgroundLogin.png"
import ImgLogin from "../img/imgLogin.jpeg"

import swal from "sweetalert";

const URI = "https://localhost/login";

const Login = () => {
    
    const { updateSession } = useContext(SessionContext);
    const { session } = useContext(SessionContext);

    const navigate = useNavigate();

    const [state, setState] = useState({
        usuario: "",
        password: "",
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
            if(state.usuario.trim() !== ''){
                const formData = {
                    usuario:state.usuario, 
                    password:state.password};

                setErrorMsg('');
                await axios.post(URI, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((res) => {
                    //console.log(res.data);
                    if(res.data.msg == "Credenciales Incorrectas"){
                        swal(res.data.msg, "Intente de nuevo", "error");
                    }else{
                        localStorage.setItem('JWT_token', res.data);//store token
                        axios({
                            method: 'get',
                            url: URI,
                            headers: {
                                'Content-Type': 'application/json',
                                token: localStorage.getItem('JWT_token'),
                            },
                            params: { usuario:state.usuario } 
                        }).then((res) => {
                            //console.log(res.data);
                            updateSession(res.data); //store user data
                            if(res.data.admin == 'true'){
                                navigate('/portalAdmin');
                            }else{
                                navigate("/home");
                            } //store user info
                        });
                    }
                    
                });

                
                  
        } else {
            setErrorMsg("ERROR MESSAGE");
        }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    }

    return(
        <body style={{backgroundImage: `url(${BackgroundLogin})`, backgroundSize:"cover" }}>
            {/* <Name
                titulo="Inicia tu sesión"
            /> */}
            <div className="loginContent">
                <div style={{marginTop: '5vw', marginLeft: '27vw'}}>
                    <form id="formCont" onSubmit={handleOnSubmit}>
                        <img src={LogoAo} alt="ImgLogin" style={{width: '39vw'}}/>
                        <input type="text" name="usuario" onChange={handleInputChange} value={state.usuario} placeholder="Usuario" id="inputL" required/><br/>
                        <input type="password" name="password" onChange={handleInputChange} value={state.password} placeholder="Contraseña" id="inputL" required/><br/>
                        <br/>
                        <button id="btn" type="submit">Ingresar</button><br/>
                    </form>
                </div>
                <div className="imgLogin">
                    <img src={ImgLogin} alt="ImgLogin" style={{maxWidth: '100%', height: 'auto'}} />
                </div>
            </div>
        </body>
    );
}

export default Login;
