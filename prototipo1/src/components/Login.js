import React from "react";
import axios from "axios";
import SessionContext from "../SessionContext";
import { useContext } from "react";
import { useState } from "react"
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const URI = "http://localhost:1337/login";

const Login = () => {
    
    const { updateSession } = useContext(SessionContext);
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
        console.log(state.nombre);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(state.usuario.trim() !== ''){
                const formData = {
                    usuario:state.usuario, 
                    password:state.password};
                console.log(formData);

                setErrorMsg('');
                await axios.post(URI, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((res) => {
                    updateSession(res.data);
                    navigate('/home')
                })
                  
        } else {
            setErrorMsg("ERROR MESSAGE");
        }
    } catch (error) {
        error.response && setErrorMsg(error.response.data);
    }}

    return(
        <body>
            <h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="usuario" onChange={handleInputChange} value={state.usuario} placeholder="Usuario" id="usuario" required/><br/>
                <input type="password" name="password" onChange={handleInputChange} value={state.password} placeholder="Contraseña" id="password" required/><br/>
                <br/>
                <button type="submit">login</button><br/>
            </form>
        </body>
    );
}

export default Login;
