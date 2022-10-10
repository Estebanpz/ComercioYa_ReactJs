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
      <nav className="navbar navbar-expand-sm mb-2">
        <div className="container">
          <Link className="navbar-brand" to="#">
            Comercio Ya
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/">
                  <span>
                    <BsHouse className="m-1" />
                    Comercio Ya
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <Link to={`/negocio/${user.uid}`}>
                    <span>
                      <BsShop className="m-1" />
                      Mi Negocio
                    </span>
                  </Link>
                ) : (
                  <Link to="/inicio-sesion">
                    <span>
                      <BsDoorOpen />
                      Iniciar Sesion
                    </span>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user ? (
                  <Link to="/" onClick={() => handleSignOut()}>
                    <span>
                      <BsFillDoorClosedFill />
                      Salir
                    </span>
                  </Link>
                ) : (
                  <Link to="/crear-cuenta">
                    <span>
                      <BsPersonPlus />
                      Registrate
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/*<section className="texto-header">
        <h1>COMERCIO YA</h1>
                </section>*/}
    </Navegacion>
  );
};

const Navegacion = styled.header`
  width: 100%;
  height: 3.6rem;
  background: #36d1dc; /* fallback for old browsers */

  & > .texto-header {
    display: flex;
    height: 400px;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;

    > h1 {
      font-size: 30px;
      color: #ffffff;
      font-weight: bold;
    }
  }

  /* COLOR DE NAVEGACIÓN*/
  & > .navbar {
    background-color: #4895ef !important;
    color: blanchedalmond !important;
  }

  & > .navbar .navbar-brand {
    color: whitesmoke !important;
  }

  & > .navbar .navbar-nav > li {
    margin-right: 1rem;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: whitesmoke !important;
  font-size: 100%;

  & > span > svg {
    height: 1.5rem;
    width: 2rem;
  }
`;
export default Header;
