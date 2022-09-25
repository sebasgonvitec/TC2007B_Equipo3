import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';

//componentes
import Header from './components/Header'
import Footer from './components/Footer'

//paginas
import Home from './components/pages/Home'
import UploadMain from './components/pages/UploadMain'
import UploadSearch from './components/pages/UploadSearch'
import AddFolder from './components/pages/AddFolder'
import AddFile from './components/pages/AddFile'
import SearchMain from './components/pages/SearchMain'
import DownloadSearch from './components/pages/DownloadSearch'
import DownloadSearchFile from './components/pages/DownloadSearchFile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header className="header"/> {/* header de navegación constante en todas las páginas */}
        <Routes>
          <Route path='' element={<Navigate to="/home" replace={true} />}/>    {/* la página default será Home, Navigate sirve para redireccionar */}
          <Route path='/home' element={<Home />} />
          <Route path='/uploadmain' element={<UploadMain />} />
          <Route path='/uploadsearch' element={<UploadSearch />} />
          <Route path='/addfolder' element={<AddFolder />} />
          <Route path='/addfile' element={<AddFile />} />
          <Route path='/searchmain' element={<SearchMain />} />
          <Route path='/downloadsearch' element={<DownloadSearch />} />
          <Route path='/downloadsearchfile' element={<DownloadSearchFile />} />

          {/* Agregar aqui la ruta a los componentes que se vayan importando.   /home es como aparecerá en el URL de la página */}
        </Routes>
        
        <Footer/>
        
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
