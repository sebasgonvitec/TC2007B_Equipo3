import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../components/App";
import Header from "../components/Header";
import Subir from "../components/Subir";
import { Descargar } from "../components/Descargar";
import DescargarArchivo from "../components/DescargarArchivo";
import SubirArchivo from "../components/SubirArchivo";
import { DownloadProvider } from "../DownloadContext";
import { UploadProvider } from "../UploadContext";


const AppRouter = () => (
    <DownloadProvider>
    <UploadProvider>
    <BrowserRouter>
        <div className="container">
            <Header />
            <div className="main-contet">
                <Routes>
                    <Route path="/" element={<App />}/>
                    <Route path="/subir" element={<Subir />} />
                    <Route path="/subirArchivo" element={<SubirArchivo />} />
                    <Route path="/descargar" element={<Descargar />} />
                    <Route path="/descargarArchivo" element={<DescargarArchivo />} />
                </Routes>
            </div>
        </div>    
    </BrowserRouter>
    </UploadProvider>
    </DownloadProvider>
);

export default AppRouter;