import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import esMessages from "../language/es.json";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UploadContext  from "../UploadContext";
import SessionContext from "../SessionContext";
import { useNavigate } from 'react-router-dom';

const URI = 'https://localhost/nulidad';

function Subir() {

    const { updateUpload } = useContext(UploadContext);
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [])

    const getData = async () => {

        const config = {
            headers:{
              token: localStorage.getItem('JWT_token'),
            }
        };
        await axios.get(URI, config).then((res) => {
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
                <Link to='/subirArchivo'>
                <button onClick={
                    () => updateUpload(dataItem)
                    }>Abrir</button>
                </Link>
            </td>
        );
    };
    
    return (
        <>
        <h1>Subir archivos</h1>
        <p>Seleccione expediente para subir un archivo</p>
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
                    <GridColumn field="estatus" title="Estatus" />
                    <GridColumn field="fecha" title="Fecha"/>
                    <GridColumn cell={MyCommandCell}  width="100px" filterable={false}/>

                </Grid>   
            </IntlProvider>
        </LocalizationProvider>
        <Link to='/crearExpediente'>Crear nuevo expediente</Link>
        </>
    );
}

export default Subir;