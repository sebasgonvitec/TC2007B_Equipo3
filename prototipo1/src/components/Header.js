/** 
 * Header Component with navigation enabled
 * 
 * 9/21/2022
 * 
*/

//import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
    <div>
        <nav>
            <Link to='/'>
                Home
            </Link>
            <Link to='/subir'>
                Subir
            </Link>
            <Link to='/descargar'>
                Descargar
            </Link>
            <Link to='/subirArchivo'>
                Subir Archivo
            </Link>
            <Link to='/descargarArchivo'>
                Descargar Archivo
            </Link>
        </nav>
    </div>)
}

export default Header;