import axios from "axios";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import UploadContext  from "../UploadContext";
import Dropzone from 'react-dropzone';

let URI = 'http://localhost:1337/subirArchivo?';

const SubirArchivo = () => {

    //Import upload from UploadContext to specify expediente
    const { upload } = useContext(UploadContext);

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
                    formData.append('expediente', upload._id);

                    setErrorMsg('');
                    await axios.post(URI, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
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
    // try{
    //     const res = await axios({
    //         method: 'post',
    //         url: URI,
    //         data: {
    //             "archivoPrueba": state.archivoPrueba,
    //             "nombre": state.nombre,
    //             "folio": state.folio,
    //         },
    //         //data: formData,
    //         // headers: {
    //         //     "Content-Type": "multipart/form-data",
    //         // },
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     console.log(res);
    // } catch (error) {
    //     console.log(error);}
    };

    return(
        <>
            <h1>Subir Archivo</h1>

            <div>
                <h2>Informacion del expediente</h2>
                <p>Nombre: {upload.nombre}</p>
                <p>Numero: {upload.numero}</p>
                <p>Expediente: {upload.expediente}</p>
                <p>Actor: {upload.actor}</p>
            </div>


            <form onSubmit={handleOnSubmit}>
                {errorMsg && <p>{errorMsg}</p>}
                <input type="text" name="nombre" onChange={handleInputChange} value={state.nombre} placeholder="Nombre" />
                <input type="text" name="folio" onChange={handleInputChange} value={state.folio} placeholder="Folio" />
                <button type="submit">Subir</button>
                {/* <input type="text" name="archivoPrueba" onChange={handleInputChange} value={state.archivoPrueba} placeholder="Archivo" /> */}
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
    )
}

export default SubirArchivo;