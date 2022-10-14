import './styleComponents/Footer.css'
import logoAOFooter from '../img/logo_footer.svg'
import { useContext } from "react";
import SessionContext from "../SessionContext";

function Footer(){
    const { session } = useContext(SessionContext);
    if(session != null){
    return(
        <div className="footer">
            <img img src={logoAOFooter} alt="LogoFooter" className="logoFooter"/>
            <p className="txtFooter">
                <div>Unidad Administrativa Municipal</div>
                <div>Canario s/n Esq. Calle 10, </div>
                <div>Col. Tolteca, C.P. 01150, CDMX </div>
                <div>oficina.alcaldia@aao.cdmx.gob.mx </div>
                <div>Tel: (55) 5 276 6700</div>
            </p>
        </div>
    ); } else{
        return(
            <span></span>
        );
    }
}

export default Footer