/*
 * Pantalla de Inicio de la aplicación
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
import './styleComponents/Home.css'
import ImgBackground from '../img/background.png'
import LogoBanner from '../img/logo_banner.svg'
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import SessionContext from '../context/SessionContext';
import ReloadAlert from './components/Reload';
import Arrow from './components/Arrow'


function Home(){

    const { session } = useContext(SessionContext);
    ReloadAlert();

    if(session != null)
    {
        return(
            <div style={{marginBottom:"5vw"}}>
                <div className="banner">
                    <img src={ImgBackground} alt="imgBackground" style={{width: '100%'}}/>
                    <div className="contentBanner">
                        <img src={LogoBanner} alt="LogoBanner" style={{width: '56.91vw', height: 'auto'}}/>
                        <p>PORTAL DE ARCHIVOS</p>
                        <Arrow/>
                        { /*<a className="arrow" href="#optionsContainer">
                            <IoIosArrowDown style={{width: '8.33vw', height: '6.6vw'}}/>
        </a> */}
                    </div>
                </div>
    
                <div data-testid="optionContainers" id="optionsContainer">
                    <div className="options" >
                        <Link to={"/searchmain"}  className="btnLink" data-testid="search">
                            <button id="btnIcon" style={{background:"#8B2E87"}}>
                                <BiSearch className="icono"/>
                                <div className="txtIcon">Buscar</div>
                            </button>
                        </Link>
    
                        <Link to={"/uploadmain"} className="btnLink" data-testid="upload">
                            <button id="btnIcon" style={{background:"#45B2E6"}}>
                                <BsUpload className="icono"/>
                                <div className="txtIcon">Subir</div>
                            </button>
                            
                        </Link>
                        <Link to={"/perfil"} className="btnLink" data-testid="profile">
                            <button id="btnIcon" style={{background:"#FFA928"}}>
                                <CgProfile className="icono"/>
                                <div className="txtIcon">Perfil</div>
                            </button>
                        </Link>
                    </div>
                    <p style={{paddingBottom: "2vw"}}>¡Haz click en una de las opciones para comenzar!</p>               
                </div>  
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default Home;