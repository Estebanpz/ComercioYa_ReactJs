import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
//Importacion de componentes
import Error404 from './components/Error404';
import Home from './components/Home';
import Header from './components/Header';
import InicioSesion from './components/InicioSesion';
import CrearCuenta from './components/CrearCuenta';
function App() {
  return (
    <BrowserRouter>
      <ContenedorPrincipal>
        <Header />
        <Main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inicio-sesion' element={<InicioSesion/>}/>
          <Route path='/crear-cuenta' element={<CrearCuenta/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
        </Main>
      </ContenedorPrincipal>
    </BrowserRouter>
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