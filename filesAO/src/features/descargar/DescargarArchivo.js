/*
 * Componente Descarga de Archivos
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
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import esMessages from "../../language/es.json";

import DownloadContext from "../../context/DownloadContext";
import fileDownload from 'js-file-download';
import SessionContext from "../../context/SessionContext";
import ReloadAlert from "../components/Reload";
import { useNavigate, Navigate, Link } from 'react-router-dom';

import "../styleComponents/Descargar.css"
import Name from "../components/Name"
import InfoArchivo from "../components/InfoArchivo";
import { BsChevronLeft } from "react-icons/bs";

let URI = 'https://localhost/descargarArchivos/download'
let URI_TEST = 'https://localhost/descargarArchivos'
const logURI = "https://localhost/registrarActividad";

function DescargarArchivo(){

    ReloadAlert();
    
    const navigate = useNavigate();

    const { download } = useContext(DownloadContext);

    const { session } = useContext(SessionContext);

    const [data, setData] = useState([]);
    useEffect( () => {
        const getData = async () => {
            const config = {
                params: { expediente: download._id },
                headers:{
                  token: localStorage.getItem('JWT_token'),
                }
            };
            await axios.get(URI_TEST, config).then((res) => {
                if(res.data !== null){
                    setData(res.data)   
                }
                else {
                    navigate('/login')
                }
            })
        };

        getData();
    }, [])

    //console.log(download._id)
    //console.log(download.area)

    

    //Estados de la data en la tabla al momento de utilizar filtros
    const [dataState, setDataState] = React.useState({skip: 0, take: 5})
    const [result, setResult] = React.useState(process(data, dataState));
    useEffect(() => { setResult(data)}, [data] )
   

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(data, event.dataState));
    }
    const downloadFile2 = (id, nombre, folio, expedienteNom) =>{
        
        
        
        axios({
            url: URI,
            method: 'GET',
            headers:{
                token: localStorage.getItem('JWT_token'),
            },
            responseType: 'blob',
            params: { id: id, nombre: nombre, area: download.area} // important
        }).then((res)=>{
            
            const logData = {usuario:session.nombre, fecha: new Date().toLocaleString(), accion: "Descargó un archivo.", folio: folio, area: expedienteNom}

            axios.post(logURI, logData, {
            headers:{
                'Content-Type': 'application/json',
                token: localStorage.getItem('JWT_token')
            }
            });
            
            fileDownload(res.data, nombre+".pdf");
        })
    }


    //Personalizar filtros para la tabla
    const filterOperators = {
        text: [
            { text: 'grid.filterContainsOperator', operator: 'contains', messages:'heey' },
            { text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain' },
            { text: 'grid.filterEqOperator', operator: 'eq' },
            { text: 'grid.filterNotEqOperator', operator: 'neq' },
            { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
            { text: 'grid.filterEndsWithOperator', operator: 'endswith' },
            // { text: 'grid.filterIsNullOperator', operator: 'isnull' },
            // { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' },
            // { text: 'grid.filterIsEmptyOperator', operator: 'isempty' },
            // { text: 'grid.filterIsNotEmptyOperator', operator: 'isnotempty' }
        ],
        numeric: [
            { text: 'grid.filterEqOperator', operator: 'eq' },
            { text: 'grid.filterNotEqOperator', operator: 'neq' },
            { text: 'grid.filterGteOperator', operator: 'gte' },
            { text: 'grid.filterGtOperator', operator: 'gt' },
            { text: 'grid.filterLteOperator', operator: 'lte' },
            { text: 'grid.filterLtOperator', operator: 'lt' },
            { text: 'grid.filterIsNullOperator', operator: 'isnull' },
            { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
        ],
        date: [
            { text: 'grid.filterEqOperator', operator: 'eq' },
            { text: 'grid.filterNotEqOperator', operator: 'neq' },
            { text: 'grid.filterAfterOrEqualOperator', operator: 'gte' },
            { text: 'grid.filterAfterOperator', operator: 'gt' },
            { text: 'grid.filterBeforeOperator', operator: 'lt' },
            { text: 'grid.filterBeforeOrEqualOperator', operator: 'lte' },
            { text: 'grid.filterIsNullOperator', operator: 'isnull' },
            { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
        ],
        boolean: [
          {text: "grid.filterEqOperator", operator: "eq"}
        ],
    };
    
    //cargar los mensajes/etiquetas para filtros en español
    loadMessages(esMessages, "es-ES"); 

    // Componente de boton para acciones en cada fila
    const MyCommandCell = (props) => {
        const { dataItem } = props;
        return(
            <td>
                <button id="btnAbrir" onClick={(e) => {
                    e.preventDefault();
                    downloadFile2(dataItem._id, dataItem.nombre, dataItem.folio, dataItem.expedienteNom);
                    }}>Descargar</button>
            </td>
        );
    };
    
    if(session != null)
    {
        return (
            <body style={{marginLeft:"5.8vw", marginRight:"5.8vw", marginBottom:"5vw"}}>
                <Name
                        titulo="Descargar Archivos"
                        descripcion="Seleccione el archivo que desea descargar"
                />
                <Link to={"/searchmain"}  className="btnBack" style={{color: "#8B2E87"}}>
                        <BsChevronLeft style={{width:"2.5vw", height:"auto"}}/>
                        <div>Volver</div>
                </Link>

                <div style={{
                    display:"flex",
                    marginTop: "1.5vw", 
                    marginBottom: "3vw"}}>
                    <InfoArchivo
                        expediente = {download.expediente}
                        carpeta_inv = {download.carpeta_inv}
                        numero = {download.numero}
                        fecha = {download.fecha}
                        estatusJuridico = {download.estatusJuridico}
                        estado = {download.estado}
                    />
                </div>

                {/* {errorMsg && <div className="error">{errorMsg}</div>} */}
                <LocalizationProvider language="es-ES"> 
                    <IntlProvider locale="es">

                        <Grid
                            data={result}
                            filterable={true}
                            onDataStateChange={onDataStateChange}
                            filterOperators={filterOperators}
                            pageable={true}
                            total={data.length}
                            {...dataState}
                        >
                            <GridColumn field="nombre" title="Nombre" />
                            <GridColumn field="folio" title="Folio" />
                            <GridColumn field="fecha" title="Fecha" />
                            <GridColumn cell={MyCommandCell} width="180px" filterable={false}/>

                        </Grid>   
                    </IntlProvider>
                </LocalizationProvider>
                <a></a>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default DescargarArchivo;
