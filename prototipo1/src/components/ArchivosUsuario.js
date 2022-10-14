import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import esMessages from "../language/es.json";
import { useNavigate, Navigate } from 'react-router-dom';
import { useContext } from "react";
import SessionContext from "../SessionContext";

import "./styleComponents/ArchivosUsuario.css"
import swal from 'sweetalert';

const URI = 'https://localhost/archivosUsuario'
const URI_delete = 'https://localhost/borrarArchivo'

const ArchivosUsuario = () => {

    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [])

    //Funcion para obtener los datos de la DB
    const getData = async () => {
        const res = await axios.get(URI, {
            params: { usuario: session._id },
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('JWT_token')
            }
        })
        setData(res.data)
    }

    // const eraseData = async () =>{
    //     const res = await axios({
    //         url: URI_delete,
    //         method: 'DELETE',
    //         params: { id: dataItem._id, nombre: dataItem.nombre}, // important
    //         headers: { token: localStorage.getItem('JWT_token')}
    //     }).then((res) => {
    //         console.log(res);
    //         getData()});
    // }

    //Estados de la data en la tabla al momento de utilizar filtros
    const [dataState, setDataState] = React.useState()
    const [result, setResult] = React.useState(data);
    //console.log(result)
    useEffect(() => { setResult(data)}, [data] )
   

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(data, event.dataState));
    }

    //Personalizar filtros para la tabla
    const filterOperators = {
        text: [
            { text: 'grid.filterContainsOperator', operator: 'contains'},
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

    // Componente de boton para editar cuenta
    const DeleteButton = (props) => {
        const { dataItem } = props;
        //console.log(dataItem);
        return(
            <td>
                <button id="btnBorrar" onClick={(e) => {
                    e.preventDefault();
                    axios({
                        url: URI_delete,
                        method: 'DELETE',
                        params: { id: dataItem._id, nombre: dataItem.nombre}, // important
                        headers: { token: localStorage.getItem('JWT_token')}
                    }).then((res)=>{
                        if(res.data.msg == "Archivo eliminado correctamente"){
                            swal("Archivo eliminado", "El archivo ha sido eliminado correctamente", "success");
                        }else{
                            swal("Error al eliminar el archivo", "Intente nuevamente", "error");
                        }
                    });
                    getData(); //Actualizar eliminacion

                }}>Borrar</button>
            </td>
        );
    };

    if(session != null)
    {
        return(
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
                        <GridColumn field="expedienteNom" title="Nombre Expediente"/>
                        <GridColumn title="Borrar Archivo" cell={DeleteButton} filterable={false} width="150vw"/>

                    </Grid>   
                </IntlProvider>
            </LocalizationProvider>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default ArchivosUsuario;
