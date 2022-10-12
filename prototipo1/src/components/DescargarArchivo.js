import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import esMessages from "../language/es.json";
import { useContext } from "react";
import DownloadContext from "../DownloadContext";
import { filterBy } from "@progress/kendo-data-query";
// import downloadjs from 'downloadjs';
import fileDownload from 'js-file-download';
import SessionContext from "../SessionContext";
import ReloadAlert from "./Reload";
import { useNavigate, Navigate } from 'react-router-dom';



let URI = 'https://localhost/descargarArchivos/download'
let URI_TEST = 'https://localhost/descargarArchivos'
const logURI = "https://localhost/registrarActividad";


function DescargarArchivo(){

    ReloadAlert();
    
    const navigate = useNavigate();

    const { download } = useContext(DownloadContext);

    const { session } = useContext(SessionContext);

    const [errorMsg, setErrorMsg] = useState('');

    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [])

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
    }

    //Estados de la data en la tabla al momento de utilizar filtros
    const [dataState, setDataState] = React.useState()
    const [result, setResult] = React.useState(data);
    useEffect(() => { setResult(data)}, [data] )
   

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(data, event.dataState));
    }
    const downloadFile2 = (id, nombre, folio, expediente) =>{
        
        
        
        axios({
            url: URI,
            method: 'GET',
            headers:{
                token: localStorage.getItem('JWT_token'),
            },
            responseType: 'blob',
            params: { id: id, nombre: nombre } // important
        }).then((res)=>{
            
            const logData = {usuario:session.nombre, fecha: new Date().toString(), accion: "Descargó un archivo.", folio: folio, area: expediente}

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
                <button onClick={(e) => {
                    e.preventDefault();
                    downloadFile2(dataItem._id, dataItem.nombre, dataItem.folio, dataItem.expediente);
                    }}>Descargar</button>
            </td>
        );
    };
    
    if(session != null)
    {
        return (
            <>
            <h1>Descargar Archivos</h1>
            <p>Seleccione el archivo que desea descargar</p>
            
            <div>
                <h2>Informacion del expediente</h2>
                <p>Nombre: {download.nombre}</p>
                <p>Numero: {download.numero}</p>
                <p>Expediente: {download.expediente}</p>
                <p>Actor: {download.actor}</p>
            </div>
            {errorMsg && <div className="error">{errorMsg}</div>}
            <LocalizationProvider language="es-ES"> 
                <IntlProvider locale="es">

                    <Grid
                        data={result}
                        filterable={true}
                        onDataStateChange={onDataStateChange}
                        filterOperators={filterOperators}
                        {...dataState}
                    >
                        <GridColumn field="nombre" title="Nombre" />
                        <GridColumn field="folio" title="Folio" />
                        <GridColumn field="fecha" title="Fecha" />
                        <GridColumn cell={MyCommandCell} width="300px" filterable={false}/>

                    </Grid>   
                </IntlProvider>
            </LocalizationProvider>
            <a></a>
            </>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default DescargarArchivo;
