import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//componentes
import HeaderGina from "../components/HeaderGina";
import Footer from "../components/Footer";

//paginas
import App from "../components/App";
import Header from "../components/Header";
import Subir from "../components/Subir";
import { Descargar } from "../components/Descargar";
import DescargarArchivo from "../components/DescargarArchivo";
import SubirArchivo from "../components/SubirArchivo";
import CrearExpediente from "../components/CrearExpediente";
import Register from "../components/Register";
import Login from '../components/Login';
import Profile from '../components/Profile';
import AccountsTable from '../components/AccountsTable';
import { DownloadProvider } from "../DownloadContext";
import { UploadProvider } from "../UploadContext";
import { SessionProvider } from '../SessionContext';
//import Home from "../components/pages/Home";
import Home from "../components/pages/Home";
import UploadMain from "../components/pages/UploadMain";
import SearchMain from "../components/pages/SearchMain";
import CrearExpedienteInv from '../components/CrearExpedienteInv';
import SubirInv from '../components/SubirInv';
import DescargarInv from '../components/DescargarInv';
import PortalAdmin from '../components/PortalAdmin';
import EditarUsuario from '../components/EditarUsuario';


function AppRouter() {
    return(
    <div className="App">
    <DownloadProvider>
    <UploadProvider>
    <SessionProvider>
    <BrowserRouter>
            <HeaderGina className="header" />
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