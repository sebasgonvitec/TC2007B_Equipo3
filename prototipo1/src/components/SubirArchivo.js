import axios from "axios";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import UploadContext  from "../UploadContext";
import Dropzone from 'react-dropzone';
//import '../components/styleComponents/Subir.css';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom"

import Name from "./Name"
import "./styleComponents/SubirArchivo.css"
import { BsChevronLeft } from "react-icons/bs";
import { AiOutlineFolder } from "react-icons/ai";

let URI = 'https://localhost/subirArchivo?';

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // 0-11
let year = date.getFullYear();

const SubirArchivo = () => {

    ReloadAlert();

    //Import upload from UploadContext to specify expediente
    const { upload } = useContext(UploadContext);

    const { session } = useContext(SessionContext);

    const [archivo, setArchivo] = useState(null);
    const [state, setState] = useState({
        nombre: "",
        folio: "",
        //archivoPrueba: "",
    });

    const[errorMsg, setErrorMsg] = useState("");
    const dropRef = useRef();

    //Updates state on input changes
    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setArchivo(uploadedFile);

        dropRef.current.style.border = '2px dashed #e9ebeb';
    }

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
          dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
          dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    };

    // //Upload file to axios on submit
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(state.nombre.trim() !== '' && state.folio.trim() !== ''){
                if(archivo){
                    const formData = new FormData();
                    formData.append('archivo', archivo);
                    formData.append('nombre', state.nombre);
                    formData.append('folio', state.folio);
                    formData.append('fecha', `${day}/${month}/${year}`);
                    formData.append('expediente', upload._id);
                    formData.append('expedienteNom', upload.nombre);
                    formData.append('usuario', session._id);

                    setErrorMsg('');
                    await axios.post(URI, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            token: localStorage.getItem('JWT_token')
                        }
                    });
                } else {
                    setErrorMsg("Seleccione un archivo");
                }
            } else {
                setErrorMsg("Por favor llene todos los campos");
            }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    if(session != null)
    {
        return(
            <>
                <div style={{marginLeft:"5.8vw"}}>   
                    <Name
                        titulo="Subir Archivo"
                    />
                    <Link to={"/uploadmain"}  className="btnBack" style={{color: "#8B2E87"}}>
                            <BsChevronLeft style={{width:"2.5vw", height:"auto"}}/>
                            <div>Volver</div>
                    </Link>
                    
                </div>

                 <div className="infoSubir">
                    <div className='colorBoxArchivo' style={{background:'#45B2E6'}}>
                        <AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>
                    </div>
                    <div className="infoContent">
                        <p style={{fontWeight:"bold", fontSize:"1.5vw"}}>Informacion del expediente</p>
                        <div> 
                            <span style={{fontWeight:"bold"}}>Nombre: </span> 
                            {upload.nombre}
                        </div>
                        <div>
                            <span style={{fontWeight:"bold"}}> Numero: </span>
                            {upload.numero}
                        </div>
                        <div>
                            <span style={{fontWeight:"bold"}}>Expediente: </span> 
                            {upload.expediente}
                        </div>
                        <div>
                            <span style={{fontWeight:"bold"}}> Actor: </span> 
                            {upload.actor}
                        </div>
                    </div>
                </div> 


                <form id="formSubirArchivo" onSubmit={handleOnSubmit}>
                    {errorMsg && <p>{errorMsg}</p>}
                    
                    <div className="formCont"> 
                        <p className="tituloSubir"> Ingresa los datos</p>
                        <input type="text" name="nombre" onChange={handleInputChange} value={state.nombre} placeholder="Nombre" id="nombreArch" />
                        <input type="text" name="folio" onChange={handleInputChange} value={state.folio} placeholder="Folio" id="folioArch"/>
                        <button id="btnSubir" type="submit">Subir</button>
                        {/* <input type="text" name="archivoPrueba" onChange={handleInputChange} value={state.archivoPrueba} placeholder="Archivo" /> */}
                    </div>
                    <div className="upload-section">
                        <Dropzone
                        onDrop={onDrop} 
                        onDragEnter={() => updateBorder('over')}
                        onDragLeave={() => updateBorder('leave')}
                        >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                            <input {...getInputProps()} />
                            <p>Drag and drop a file OR click here to select a file</p>
                                {archivo && (
                                    <div>
                                        <strong>Selected file:</strong> {archivo.name}
                                    </div>
                                )}
                            </div>
                        )}
                        </Dropzone>
                    </div>
                    
                    {/* <input type="file" name="file" onChange={(event) => setArchivo(event.target.files[0])} /> */}
                    
                </form>
                
                {/* <form>
                    <input type="text" name="nombre" placeholder="Nombre" />
                    <input type="text" name="folio" placeholder="Folio" />
                    <input type="file" name="archivo"/>
                    <input type="submit" value="Subir el archivo" />
                </form> */}
            </>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default SubirArchivo;