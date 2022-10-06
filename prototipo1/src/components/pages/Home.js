import './stylePages/Home.css'
import ImgBackground from '../../img/background.png'
import LogoBanner from '../../img/logo_banner.svg'

import { Link } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import SessionContext from '../../SessionContext';
import { useContext } from "react";
import { Navigate } from 'react-router-dom';


function Home(){

    const { session } = useContext(SessionContext);
    
    if(session != null)
    {
        return(
            <div>
                <div className="banner">
                    <img src={ImgBackground} alt="imgBackground" style={{width: '100%'}}/>
                    <div className="contentBanner">
                        <img src={LogoBanner} alt="LogoBanner" style={{width: '56.91vw', height: 'auto'}}/>
                        <p>PORTAL DE ARCHIVOS</p>
                        <a className="arrow" href="#optionsContainer">
                            <IoIosArrowDown style={{width: '8.33vw', height: '6.6vw'}}/>
                        </a>
                    </div>
                </div>
    
                <div id="optionsContainer">
                    <div className="options" >
                        <Link to={"/searchmain"}  className="btn" style={{background: "#8B2E87"}}>
                            <BiSearch className="icono"/>
                            <div>Buscar</div>
                        </Link>
    
                        <Link to={"/uploadmain"} className="btn" style={{background: "#45B2E6"}}>
                            <BsUpload className="icono"/>
                            <div>Subir</div>
                        </Link>
                        <Link to={"/perfil"} className="btn" style={{background: "#FFA928"}}>
                            <CgProfile className="icono"/>
                            <div>Perfil</div>
                        </Link>
                    </div>
                    <p>¡Haz click en una de las opciones para comenzar!</p>               
                </div>  
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default Home;