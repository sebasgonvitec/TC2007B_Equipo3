import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//componentes
import HeaderGina from "../features/components/HeaderGina";
import Footer from "../features/components/Footer";

//paginas
import Subir from "../features/subir/Subir";
import { Descargar } from "../features/descargar/Descargar";
import DescargarArchivo from "../features/descargar/DescargarArchivo";
import SubirArchivo from "../features/subir/SubirArchivo";
import CrearExpediente from "../features/subir/CrearExpediente";
import Register from "../features/admin/Register";
import Login from '../features/Login';
import Profile from '../features/usuario/Profile';
import AccountsTable from '../features/admin/AccountsTable';
import { DownloadProvider } from "../context/DownloadContext";
import { UploadProvider } from "../context/UploadContext";
import { SessionProvider } from '../context/SessionContext';

import Home from "../features/Home";
import UploadMain from "../features/subir/UploadMain";
import SearchMain from "../features/descargar/SearchMain";
import CrearExpedienteInv from '../features/subir/CrearExpedienteInv';
import SubirInv from '../features/subir/SubirInv';
import DescargarInv from '../features/descargar/DescargarInv';
import PortalAdmin from '../features/admin/PortalAdmin';
import EditarUsuario from '../features/admin/EditarUsuario';
import Bitacora from '../features/admin/Bitacora';


function AppRouter() {

    return(
    <div className="App">
    <DownloadProvider>
    <UploadProvider>
    <SessionProvider>
    <BrowserRouter>
        <HeaderGina className="header"/>
        
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/home" replace={true} />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/uploadmain" element={<UploadMain />} />
                <Route path="/searchmain" element={<SearchMain />} />

                <Route path="/subir" element={<Subir />} />
                <Route path="/subirInv" element={<SubirInv />}/>
                <Route path="/subirArchivo" element={<SubirArchivo />} />
                <Route path="/crearExpediente" element={<CrearExpediente />} />
                <Route path="/crearExpedienteInv" element={<CrearExpedienteInv />}/>

                <Route path="/descargar" element={<Descargar />} />
                <Route path="/descargarInv" element={<DescargarInv />}/>
                <Route path="/descargarArchivo" element={<DescargarArchivo />} />

                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/tablaUsuarios" element={<AccountsTable />} />
                <Route path="/portalAdmin" element={<PortalAdmin />} />
                <Route path="/editarUsuario" element={<EditarUsuario />} />
                <Route path="/bitacora" element={<Bitacora />} />
            </Routes>
        <Footer />
    </BrowserRouter>
    </SessionProvider>
    </UploadProvider>
    </DownloadProvider>
    </div>
    );
}

export default AppRouter;
