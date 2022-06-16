import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
//Importando Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle'
//Importacion de componentes
import Error404 from './components/Error404';
import Home from './components/Home';
import Header from './components/Header';
import InicioSesion from './components/InicioSesion';
import CrearCuenta from './components/CrearCuenta';
import RestablecerContrasena from './components/RestabalecerContrasena';
import Negocio from './components/Negocio';
import CrearNegocio from './components/CrearNegocio';
//Importando el AuthProvider
import { AuthProvider } from "./Context/AuthContext";
//Importando Ruta Privada
import RutaPrivada from './components/RutaPrivada';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        
          <Header />
          <Main>
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


const Main = styled.div`
  width: 98%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:10px 10px 10px 10px;
  background: #ffff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(129, 129, 129, 0.8);
  text-align: center;
  height: auto;
`;
export default App;