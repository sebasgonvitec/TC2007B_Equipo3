import './styleComponents/Header.css'
import logoAO from '../img/logo_ao.png'
import userIcon from '../img/userIcon.svg'

function Header(){
    return(
        <div className="header">
            <div>
                <a> <img src={logoAO} alt="Logo" className="logoAO"/> </a>
            </div>
            <div className="optionsBox">
                <a> Subir</a>
                <a> Buscar</a>
                <a> <img src={userIcon} alt="userIcon" className="userIcon" /> </a>
            </div>

        </div>
    );
}


export default Header