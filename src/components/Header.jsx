import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
//Iconos
import {BsDoorOpen, BsPersonPlus,BsHouse} from "react-icons/bs";
const Navegacion = () => {
  return (
    <ContenedorHeader>
      <Titulo>Comercio Ya</Titulo>
      <Menu>
        <NavLink to="/">
          Inicio
          <BsHouse/>
        </NavLink>
        <NavLink to="/productos"></NavLink>
        <NavLink to="/inicio-sesion">
          Inciar Sesión
          <BsDoorOpen/>
        </NavLink>
        <NavLink to="/crear-cuenta">
          Crear Cuenta
          <BsPersonPlus/>
        </NavLink>
      </Menu>
    </ContenedorHeader>
  );
};
const ContenedorHeader = styled.header`
  width: 90%;
  height: auto;
  max-width: 1200px;
  align-items: center;
  margin: 10px 0px 20px 0;
`;

const Titulo = styled.h1`
  font-size: 26px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Menu = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 0 0;

  @media (max-width: 300px) {
    flex-direction: column;
  }

  a {
    text-decoration: none;
    text-transform: uppercase;
    color: #165168;
    margin: 0px 10px;
      svg{
      font-size: 30px;
      margin-left: 10px;
      
      }
  }

  a:hover {
    color: #191668;
  }

  a.active {
    border-bottom: 2px solid #165168;
    padding-bottom: 3px;
  }

  
`;
export default Navegacion;
