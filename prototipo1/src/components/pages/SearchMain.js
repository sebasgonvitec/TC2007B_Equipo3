import './stylePages/UploadSearchMain.css'
import Name from '../Name'
import OptionBox from '../OptionBox'
import { AiOutlineFolder } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate, Navigate } from 'react-router-dom';
import { useContext } from "react";
import SessionContext from "../../SessionContext";
import DownloadContext from '../../DownloadContext';
import { Link } from "react-router-dom";
import '../styleComponents/OptionBox.css';
import '../styleComponents/Btn.css'
import swal from 'sweetalert';

function SearchMain(){

    const { session } = useContext(SessionContext);

    const { updateDownload } = useContext(DownloadContext);

    const navigate = useNavigate();

    if(session != null)
    {
        return( 
            <div style={{marginLeft:"5.8vw"}}>
                <Name 
                    titulo="Buscar Archivos"
                    descripcion="Selecciona el tipo de archivo que quieres buscar"
                />

                <div className="optionsContainer">
                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#45B2E6'}}>
                                {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="JUICIO DE NULIDAD"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        onClick={
                            () => {
                                if(session.nulidad === "true"){
                                    navigate("/descargar");
                                }else{
                                    swal("Acceso Denegado" ,  "No tienes permisos para acceder a esta área.\nRevisa con tu administrador." ,  "error" );
                                }
                            }
                        }
                    />
    
                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#8B2E87'}}>
                                {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="CARPETA DE INVESTIGACIÓN"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        onClick={
                            () => {
                                if(session.investigacion === "true"){
                                    navigate("/descargarInv");
                                }else{
                                    swal("Acceso Denegado" ,  "No tienes permisos para acceder a esta área.\nRevisa con tu administrador." ,  "error" );
                                }
                            }
                        }
                    />

                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#66C214'}}>
                                {<TbReportAnalytics className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="OTROS"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        onClick={
                            () => {
                                if(session.otros === "true"){
                                    navigate("/descargarArchivo");
                                }else{
                                    swal("Acceso Denegado" ,  "No tienes permisos para acceder a esta área.\nRevisa con tu administrador." ,  "error" );
                                }
                            }
                        }
                    />

                    {/* <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#FFA928'}}>
                                {<BiCommentDetail className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 4"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/descargar"
                    />

                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#FCDC4B'}}>
                                {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 5"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/descargar"
                    />

                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#44B2ED'}}>
                                {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 6"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/descargar"
                    /> */}

                    
                </div>
                
                
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default SearchMain;