/*
 * Pantalla de lista de usuarios
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
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import esMessages from "../../language/es.json";

import { useNavigate, Navigate, Link } from 'react-router-dom';
import SessionContext from "../../context/SessionContext";
import ReloadAlert from '../components/Reload';

import Name from "../components/Name"
import { BsChevronLeft } from "react-icons/bs";
import swal from 'sweetalert';

const URI = 'https://localhost/tablaCuentas'
const URI_delete = 'https://localhost/borrarCuenta'
const logURI = 'https://localhost/registrarActividad';

const AccountsTable = () => {

    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    ReloadAlert();

    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [])

    //Funcion para obtener los datos de la DB
    const getData = async () => {

        const res = await axios.get(URI, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('JWT_token')
            }
        })
        setData(res.data)
    }

    //Estados de la data en la tabla al momento de utilizar filtros
    const [dataState, setDataState] = React.useState({skip: 0, take: 5})
    const [result, setResult] = React.useState(process(data, dataState));
    
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
    const EditButton = (props) => {
        const { dataItem } = props;
        return(
            <td>
                <button id="btnEditar" onClick={(e) => {
                    e.preventDefault();
                    navigate("/editarUsuario", {state:{dataItem}})
                }}>Editar</button>
            </td>
        );
    };

    // Componente de boton para editar cuenta
    const DeleteButton = (props) => {
        const { dataItem } = props;
        return(
            <td>
                <button id="btnBorrar" onClick={(e) => {
                    e.preventDefault();
                    axios({
                        url: URI_delete,
                        method: 'DELETE',
                        params: { id: dataItem._id}, // important
                        headers: { token: localStorage.getItem('JWT_token')}
                    }).then(res => {
                        if(res.data.msg === "Cuenta eliminada correctamente"){
                            swal("Cuenta eliminada", "La cuenta ha sido eliminada correctamente", "success")
                            getData();
                        }else{
                            swal("Error", "No se pudo eliminar la cuenta", "error");
                        }
                    });
                    //getData(); //Actualizar eliminacion
                    const logData = {usuario:session.nombre, fecha: new Date().toLocaleString(), accion: "Eliminó un usuario", folio: dataItem.usuario, area: "Gestión de usuarios"};

                    axios.post(logURI, logData, {
                        headers:{
                            'Content-Type': 'application/json',
                            token: localStorage.getItem('JWT_token')
                        }
                    });
            
                    
                }}>Borrar</button>
            </td>
        );
    };

    if(session != null)
    {
        return(
            <body style={{marginTop: "2vw", marginRight:"5.8vw", marginBottom:"5vw", marginLeft:"5.8vw"}}>
                <Name 
                    titulo="Tabla de Usuarios"
                />
                <Link to={"/portalAdmin"}  className="btnBack" style={{color: "#8B2E87", marginBottom:"2vw"}}>
                    <BsChevronLeft style={{width:"2.5vw", height:"auto"}}/>
                    <div>Volver</div>

                </Link>
                <LocalizationProvider language="es-ES"> 
                    <IntlProvider locale="es">

                        <Grid
                            pageable={true}
                            total={data.length}
                            data={result}
                            filterable={true}
                            onDataStateChange={onDataStateChange}
                            filterOperators={filterOperators}
                            {...dataState}
                        
                        >
                            <GridColumn field="usuario" title="Usuario" />
                            <GridColumn field="nombre" title="Nombre" />
                            <GridColumn field="area" title="Area" />
                            <GridColumn field="nulidad" title="Juicios de Nulidad"/>
                            <GridColumn field="investigacion" title="Carpetas de Investigacion"/>
                            <GridColumn field="otros" title="Expedientes Otros"/>
                            <GridColumn title="Editar Usuario" cell={EditButton} filterable={false}/>
                            <GridColumn title="Borrar Usuario" cell={DeleteButton} filterable={false}/>

                        </Grid>   
                    </IntlProvider>
                </LocalizationProvider>
            </body>
        );
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default AccountsTable;


