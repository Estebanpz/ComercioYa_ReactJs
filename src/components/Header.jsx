import React from "react";
import { NavLink } from "react-router-dom";
import { signOut, auth } from "./../Firebase/firebaseConfig";
//Iconos
import {
  BsDoorOpen,
  BsPersonPlus,
  BsHouse,
  BsShop,
  BsFillDoorClosedFill,
} from "react-icons/bs";
//Importando el boton de cerrar sesion

// Importando la conexion a el contexto de User
import { useAuth } from "../Context/AuthContext";
import styled from "styled-components";

const Header = () => {
  const { user } = useAuth();

  // Funcion para cerrar sesion
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <Navegacion>
      <Menu>
        <ul>
          <ContenedorLista>
            <li>
              <Link to="/">Comercio Ya</Link>
            </li>
            <li>
              {user ? (
                <Link to={`/negocio/${user.uid}`}>Mi Negocio</Link>
              ) : (
                <Link to="/inicio-sesion">Iniciar Sesion</Link>
              )}
            </li>
            <li>
              {user ? (
                <Link to="/" onClick={() => handleSignOut()}>
                  Salir
                </Link>
              ) : (
                <Link to="/crear-cuenta">Registrate</Link>
              )}
            </li>
          </ContenedorLista>
        </ul>
      </Menu>
    </Navegacion>
  );
};

const Navegacion = styled.header`
  background-color: #000;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Menu = styled.nav`
  width: 100%;
  height: 100%;
  padding: 1rem;

  & > ul {
    list-style: none;
  }
`;

const ContenedorLista = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 0.3em;

  & > li {
    display: inline-block !important;
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 3px;
    text-align: center;

    &>li:hover {
      background-color: #456f24;
    }

    & > a {
      text-decoration: none;
      color: #fff !important;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap:.1em;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    column-gap:.1em;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover{
    transition: all ease 0.5s;
    border-bottom: 1px solid #ccc;
  }
`;
export default Header;
