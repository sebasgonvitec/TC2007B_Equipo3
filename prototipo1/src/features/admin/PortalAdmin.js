/*
 * Pantalla Portal de Administrador
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
import { useContext } from "react";
import { useNavigate, Navigate, Link } from 'react-router-dom';

import SessionContext from "../../context/SessionContext";
import ReloadAlert from "../components/Reload";
import Name from "../components/Name"

import "../styleComponents/Home.css"
import BackgroundRegister from "../../img/backgroundRegister.png"
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbActivity } from "react-icons/tb";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

function PortalAdmin(){

    const { updateSession, session } = useContext(SessionContext);
    const navigate = useNavigate();

    ReloadAlert();

    if(session != null)
    {
        return(
            <body style={{backgroundImage: `url(${BackgroundRegister})`, height: "100%"}}>
                <div style={{marginLeft:"5.8vw", marginRight:"5.8vw"}}>

                    <div className="headerAdmin">
                        <Name 
                            titulo="Portal de Administrador"
                            descripcion="Selecciona una de las opciones para comenzar"
                        />

                        <div onClick={() => {
                            updateSession(null); //borrar registro del front
                            navigate("/login");
                        }}> <BiLogOut className="iconLogout" title="Cerrar sesion" />
                        </div><br/>
                    </div>

                    <div id="optionsContainer">
                        <div className="options" >
                            <Link to={"/registro"}  className="btn" style={{background: "#8B2E87"}}>
                                <AiOutlineUserAdd className="icono"/>
                                <div>Registro de Usuarios</div>
                            </Link>
                            <Link to={"/bitacora"}  className="btn" style={{background: "#45B2E6"}}>
                                <TbActivity className="icono"/>
                                <div>Bitacora de Actividad</div>
                            </Link>
                            <Link to={"/tablaUsuarios"}  className="btn" style={{background: "#FFA928"}}>
                                <AiOutlineUserSwitch className="icono"/>
                                <div>Editar usuarios</div>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                <div style={{height: "7vw"}}></div>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default PortalAdmin;
