import './stylePages/Home.css'
import ImgBackground from '../../img/background.png'
import LogoBanner from '../../img/logo_banner.svg'
import { BiSearch } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

function Home(){
    return(
        <div >
            <div classname="banner">
                <img src={ImgBackground} alt="imgBackground" className="backgroundImg"/>
                <div className="contentBanner">
                    <img src={LogoBanner} alt="LogoBanner" className="logobanner"/>
                    <p>PORTAL DE ARCHIVOS</p>
                </div>
            </div>

            <div className="optionsContainer">
                <div className="options">
                    <div className="btn" style={{background: "#8B2E87"}}>
                        <BiSearch className="icono"/>
                        <div>Buscar</div>
                    </div>
                    <div className="btn" style={{background: "#45B2E6"}}>
                        <BsUpload className="icono"/>
                        <div>Subir</div>
                    </div>
                    <div className="btn" style={{background: "#FFA928"}}>
                        <CgProfile className="icono"/>
                        <div>Perfil</div>
                    </div>
                </div>
                <p>¡Haz click en una de las opciones para comenzar!</p>               
            </div>  
        </div>
    );
}

export default Home;