import './styleComponents/Header.css'
import { Link } from "react-router-dom"
import logoAO from '../img/logo_ao.png'
import { CgProfile } from "react-icons/cg";

function Header(){
    return(
        <div className="header">
            <div>
                <Link to={"/home"}> <img src={logoAO} alt="Logo" className="logoAO"/> </Link>
                
            </div>
            <div className="optionsBox">
                <Link to={"/uploadmain"}> <a className="txtBtn">Subir</a> </Link>
                <Link to={"/searchmain"}> <p>Buscar</p> </Link>
                <Link to={"/"}> <CgProfile style={{width: '37.5px', height: 'auto', color:'#5E5E5E'}}/> </Link>
                
            </div>

        </div>
    );
}


export default Header