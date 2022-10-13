import React from "react";
import { useContext } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";
import { Link } from "react-router-dom"

import Name from "./Name"
import "./pages/stylePages/Home.css"
import BackgroundRegister from "../img/backgroundRegister.png"
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbActivity } from "react-icons/tb";
import { AiOutlineUserSwitch } from "react-icons/ai";

function PortalAdmin(){

    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    ReloadAlert();

    if(session != null)
    {
        return(
            <body style={{backgroundImage: `url(${BackgroundRegister})`, height: "100%"}}>
                <div style={{marginLeft:"5.8vw", marginRight:"5.8vw"}}>
                    <Name 
                        titulo="Portal de Administrador"
                        descripcion="Selecciona una de las opciones para comenzar"
                    />

                    <div id="optionsContainer">
                        <div className="options" >
                            <Link to={"/registro"}  className="btn" style={{background: "#8B2E87"}}>
                                <AiOutlineUserAdd className="icono"/>
                                <div>Registro de Usuarios</div>
                            </Link>
                            <Link to={"/registro"}  className="btn" style={{background: "#45B2E6"}}>
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
                <div style={{height: "5vw"}}></div>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default PortalAdmin;