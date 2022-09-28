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
import { DownloadProvider } from "../DownloadContext";
import { UploadProvider } from "../UploadContext";
//import Home from "../components/pages/Home";
import Home from "../components/pages/Home";
import UploadMain from "../components/pages/UploadMain";
import SearchMain from "../components/pages/SearchMain";



function AppRouter() {
    return(
    <div className="App">
    <DownloadProvider>
    <UploadProvider>
    <BrowserRouter>
            <HeaderGina className="header" />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace={true} />}/>
                    <Route path="/home" element={<Home />} />
                    <Route path='/uploadmain' element={<UploadMain />} />
                    <Route path='/searchmain' element={<SearchMain />} />
                    <Route path="/subir" element={<Subir />} />
                    <Route path="/subirArchivo" element={<SubirArchivo />} />
                    <Route path="/descargar" element={<Descargar />} />
                    <Route path="/descargarArchivo" element={<DescargarArchivo />} />
                    <Route path="/crearExpediente" element={<CrearExpediente />} />
                </Routes>
        <Footer />
    </BrowserRouter>
    </UploadProvider>
    </DownloadProvider>
    </div>
    );
}

export default AppRouter;