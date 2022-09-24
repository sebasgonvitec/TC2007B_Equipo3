import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';

//componentes
import Header from './components/Header'
import Footer from './components/Footer'

//paginas
import Home from './components/pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header className="header"/> {/* header de navegación constante en todas las páginas */}
        <Routes>
          <Route path='' element={<Navigate to="/home" replace={true} />}/>    {/* la página default será Home, Navigate sirve para redireccionar */}
          <Route path='/home' element={<Home />} />
          {/* Agregar aqui la ruta a los componentes que se vayan importando.   /home es como aparecerá en el URL de la página */}
        </Routes>
        
        <Footer/>
        
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
