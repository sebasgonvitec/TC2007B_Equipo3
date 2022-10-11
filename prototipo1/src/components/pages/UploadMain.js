import './stylePages/UploadSearchMain.css'
import Name from '../Name'
import OptionBox from '../OptionBox'
import { AiOutlineFolder } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import SessionContext from "../../SessionContext";
import UploadContext from '../../UploadContext';
import { Link } from "react-router-dom";
import '../styleComponents/OptionBox.css';
import '../styleComponents/Btn.css'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ReloadAlert from '../Reload';

function UploadMain(){

    ReloadAlert();
    
    const { session } = useContext(SessionContext);

    const { updateUpload } = useContext(UploadContext);

    const navigate = useNavigate();

    if(session != null)
    {
        return( 
            <div style={{marginLeft:"5.8vw"}}>
                <Name 
                    titulo="Subir Archivos"
                    descripcion="Selecciona el tipo de archivo que quieres subir"
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
                                    navigate("/subir");
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
                                    navigate("/subirInv");
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
                                    navigate("/subirArchivo");
                                    updateUpload({_id:"000000000000000000000000"});
                                }else{
                                    swal("Acceso Denegado" ,  "No tienes permisos para acceder a esta área.\nRevisa con tu administrador." ,  "error" );
                                }
                            }
                        }
                    />

                    {/* <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#66C214'}}>
                                {<TbReportAnalytics className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="OTROS"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page={()=>{
                            <Navigate to="/subirArchivo" />
                            updateUpload({_id:"633f654ee9a2f2806e92435a"});
                        }}
                    /> */}

                    {/* <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#FFA928'}}>
                                {<BiCommentDetail className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 4"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/subir"
                    />

                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#FCDC4B'}}>
                                {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 5"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/subir"
                    />

                    <OptionBox
                        colorbox={
                            <div className='colorBox' style={{background:'#44B2ED'}}>
                                {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 6"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/subir"
                    /> */}

                    
                </div>
                
                
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default UploadMain;