/*
 * Pantalla de principal de subida de archivos
 *  
 * Autores:
 * - Andreína Isabel Sanánez
 * - Sebastián González
 * - Francisco Salcedo
 * - Regina Rodríguez
 * - Andrea Diego
 * 
 * 10/6/2022 
 * 
 */
import React from "react";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";

import '../styleComponents/UploadSearchMain.css'
import { AiOutlineFolder } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
//import { BiCommentDetail } from "react-icons/bi";

import SessionContext from "../../context/SessionContext";
import UploadContext from '../../context/UploadContext';
import Name from '../components/Name'
import OptionBox from '../components/OptionBox'

import '../styleComponents/OptionBox.css';
import '../styleComponents/Btn.css'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ReloadAlert from '../components/Reload';

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
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#45B2E6'}}>
                                {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="JUICIO DE NULIDAD"
                        descripcion="En esta sección podrás subir archivos a los expedientes de la categoría Juicio de Nulidad"
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
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#8B2E87'}}>
                                {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="CARPETA DE INVESTIGACIÓN"
                        descripcion="En esta sección podrás subir archivos a los expedientes de la categoría Carpeta de Investigación"
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
                        colorboxOption={
                            <div className='colorboxOption' style={{background:'#66C214'}}>
                                {<TbReportAnalytics className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                            </div>
                        }
                        titulo="OTROS"
                        descripcion="En esta sección podrás subir archivos que no corresponden a ningún exppediente"
                        onClick={
                            () => {
                                if(session.otros === "true"){
                                    navigate("/subirArchivo");
                                    updateUpload({_id:"000000000000000000000000"});
                                    updateUpload({nombre:"N/A"});
                                }else{
                                    swal("Acceso Denegado" ,  "No tienes permisos para acceder a esta área.\nRevisa con tu administrador." ,  "error" );
                                }
                            }
                        }
                    />

                </div>
                
                
            </div>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default UploadMain;