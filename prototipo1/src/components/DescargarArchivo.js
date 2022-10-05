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


let URI = 'https://localhost/descargarArchivos/download'
let URI_TEST = 'https://localhost/descargarArchivos'

function DescargarArchivo(){
    
    const { download } = useContext(DownloadContext);

    const [errorMsg, setErrorMsg] = useState('');

    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [])

    //Funcion para obtener los datos de la DB
    const getData = async () => {
        //const res = await axios.get(URI+download.nombre)
        const res = await axios.get(URI_TEST, { params: { expediente: download._id }})
        setData(res.data)
    }

    //Estados de la data en la tabla al momento de utilizar filtros
    const [dataState, setDataState] = React.useState()
    const [result, setResult] = React.useState(data);
    useEffect(() => { setResult(data)}, [data] )
   

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(data, event.dataState));
    }
    const downloadFile2 = (id, nombre) =>{
        axios({
            url: URI,
            method: 'GET',
            responseType: 'blob',
            params: { id: id, nombre: nombre } // important
        }).then((res)=>{
            fileDownload(res.data, nombre+".pdf");
        })
    }

    // const downloadFile = async (nombre) => {
    //     try{
    //         const result = await axios.get(URI, { params: { nombre: nombre } }, { 
    //             responseType: 'blob'
    //          });
    //         return downloadjs(result.data, nombre, 'application/pdf');
    //         // await axios.post(URI, {nombre: nombre}, {
    //         //     headers: {
    //         //         'Content-Type': 'application/json'
    //         //     },
    //         // }).then((response) => {
    //         //     //download(response.data, nombre+".pdf", "application/pdf");
    //         //     //console.log(response.data);
    //         //     //var arrBuffer = base64ToArrayBuffer(response.data)
    //         //     var blob = new Blob([response.data], { type: 'application/pdf'})
    //         //     console.log(response.data)
    //         //     downloadjs(blob, nombre+".pdf", "application/pdf");
                
    //         // });
    //         // //console.log(result.data);
    //         // //const split = path.split('/');
    //         // //const filename = split[split.length - 1];
    //         // setErrorMsg('');
    //         // //return download(result.data, filename, mimetype);
    //     } catch (error){
    //         if(error.response && error.response.status === 404){
    //             setErrorMsg('Error al descargar el archivo');
    //         }
    //     }
    // }


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
                    downloadFile2(dataItem._id, dataItem.nombre);
                    }}>Descargar</button>
                <button onClick={() => console.log(dataItem._id)}>Info</button>
            </td>
        );
    };
    
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

export default DescargarArchivo;