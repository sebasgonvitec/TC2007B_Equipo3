/*
 * Pantalla principal de busqueda/descarga de archivos
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
import { useContext } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import '../styleComponents/UploadSearchMain.css'
import '../styleComponents/OptionBox.css';
import '../styleComponents/Btn.css'
import { AiOutlineFolder } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";

import Name from '../components/Name'
import OptionBox from '../components/OptionBox'
import SessionContext from "../../context/SessionContext";
import DownloadContext from '../../context/DownloadContext';

import swal from 'sweetalert';
import ReloadAlert from '../components/Reload';

function SearchMain(){

    ReloadAlert();

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
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#66C214'}}>
                                {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="JUICIO DE NULIDAD"
                        descripcion="En esta sección podrás buscar los expedientes de la categoría Juicio de Nulidad"
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
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#44B2ED'}}>
                                {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="CARPETA DE INVESTIGACIÓN"
                        descripcion="En esta sección podrás buscar los expedientes de la categoría Carpeta de Investigación"
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
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#FFA928'}}>
                                {<TbReportAnalytics className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="OTROS"
                        descripcion="En esta sección podrás buscar los archivos que no corresponden a ningún expediente"
                        onClick={
                            () => {
                                if(session.otros === "true"){
                                    updateDownload({_id:"000000000000000000000000", area:"otros"});
                                    navigate("/descargarArchivo");
                                }else{
                                    swal("Acceso Denegado" ,  "No tienes permisos para acceder a esta área.\nRevisa con tu administrador." ,  "error" );
                                }
                            }
                        }
                    />

                    {/* <OptionBox
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#FFA928'}}>
                                {<BiCommentDetail className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 4"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/descargar"
                    />

                    <OptionBox
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#FCDC4B'}}>
                                {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="TITULO 5"
                        descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                        page="/descargar"
                    />

                    <OptionBox
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#44B2ED'}}>
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