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
import { Link } from "react-router-dom";

const URI = 'http://localhost:1337/';
//const URI_DOWNLOAD = 'http://localhost:1337/descargarArchivos?nombre=';

//let clickValue;
//let clicked = false;

function Descargar(){

    const { updateDownload } = useContext(DownloadContext);

    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [])

    //Funcion para obtener los datos de la DB
    const getData = async () => {
            const res = await axios.get(URI)
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


    const BotonSubir = (props) => {
        const { dataItem } = props;
        return(
            <td>
                <Link to='/descargarArchivo'>
                    <button onClick={
                        () => updateDownload(dataItem.nombre)
                    }>Abrir</button>
                </Link>
            </td>
        );
    };
    return (
        <>
        <h1>Descargar Expediente</h1>
        <p>Seleccione expediente para descargar un archivo</p>
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
                    <GridColumn field="numero" title="Número" />
                    <GridColumn field="expediente" title="Expediente" />
                    <GridColumn field="actor" title="Actor" />
                    <GridColumn field="estatus" title="Estatus"/>
                    <GridColumn cell={BotonSubir}  width="100px" />

                </Grid>   
            </IntlProvider>
        </LocalizationProvider>
        </>
    );
}

export {Descargar};