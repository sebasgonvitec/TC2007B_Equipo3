/*
 * Componente Header de la app
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

import '../styleComponents/Header.css'
import { Link } from "react-router-dom"
import logoAO from '../../img/logo_ao.png'
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";

function HeaderGina(){
    const { session } = useContext(SessionContext);
    if(session != null && session.admin == null){
        return(
            <div className="header">
                <div>
                    <Link to={"/home"}> <img src={logoAO} alt="Logo" className="logoAO"/> </Link>
                    
                </div>
                <div className="optionsBox">
                    <Link to={"/searchmain"}> <p>Buscar</p> </Link>
                    <Link to={"/uploadmain"}> <p>Subir</p> </Link>
                    <Link to={"/perfil"}> <CgProfile style={{width: '37.5px', height: 'auto', color:'#5E5E5E'}}/> </Link>  
                    {/* <Link to={"/portalAdmin"}> <p>Portal Admin</p> </Link>  */}
                </div>
            </div>
        );
    }
    else{
        return(
            <span></span>
        );
    }
}


export default HeaderGina;