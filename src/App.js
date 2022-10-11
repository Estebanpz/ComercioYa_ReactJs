import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Importacion de componentes
import Error404 from './components/Error404';
import Home from './components/Home';
import Header from './components/Header';
import InicioSesion from './components/InicioSesion';
import CrearCuenta from './components/CrearCuenta';
import RestablecerContrasena from './components/RestabalecerContrasena';
import CrearNegocio from './components/CrearNegocio';
import Negocio from './components/Negocio';
//Importando el AuthProvider
import { AuthProvider } from "./Context/AuthContext";
//Importando Ruta Privada
import RutaPrivada from './components/RutaPrivada';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Header />
        <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/inicio-sesion' element={<InicioSesion />} />
            <Route path='/crear-cuenta' element={<CrearCuenta />} />
            <Route path='/restablecer-contrasena' element={<RestablecerContrasena />} />
            <Route path='/negocio/:id' element={
              <RutaPrivada>
                <Negocio />
              </RutaPrivada>
            } />

            <Route
              path='/crear-negocio'
              element={
                <RutaPrivada>
                  <CrearNegocio />
                </RutaPrivada>
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Main>
        
      </BrowserRouter>
    </AuthProvider>
  );
}

const Main = styled.main`
  width:100%;
  height:auto;
`;
export default App;