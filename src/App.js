import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
//Importacion de componentes
import Error404 from './components/Error404';
import Home from './components/Home';
import Header from './components/Header';
import InicioSesion from './components/InicioSesion';
import CrearCuenta from './components/CrearCuenta';
import RestablecerContrasena from './components/RestabalecerContrasena';
import Negocio from './components/Negocio';
//Importando el AuthProvider
import {AuthProvider} from "./Context/AuthContext";
//Importando Ruta Privada
import RutaPrivada from './components/RutaPrivada';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ContenedorPrincipal>
          <Header />
          <Main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/inicio-sesion' element={<InicioSesion/>}/>
            <Route path='/crear-cuenta' element={<CrearCuenta/>}/>
            <Route path='/restablecer-contrasena' element={<RestablecerContrasena/>}/>
            <Route path='/negocio/:id' element={
              <RutaPrivada>
                <Negocio/>
              </RutaPrivada>
            }/>
            <Route path="*" element={<Error404/>}/>
          </Routes>
          </Main>
        </ContenedorPrincipal>
      </BrowserRouter>
    </AuthProvider>
  );
}

const ContenedorPrincipal = styled.div`
  padding: 20px;
  width: 100%;
  max-width: calc(100% - 40px);
  height:auto;
`;

const Main = styled.main`
  background: #ffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 5px rgba(129, 129, 129, 0.8);
  text-align: center;
`;
export default App;