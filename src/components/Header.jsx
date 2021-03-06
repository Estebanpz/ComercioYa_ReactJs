import React from "react";
import { NavLink } from "react-router-dom";
import {signOut, auth} from "./../Firebase/firebaseConfig"
//Iconos
import { BsDoorOpen, BsPersonPlus, BsHouse, BsShop, BsFillDoorClosedFill } from "react-icons/bs";
//Importando el boton de cerrar sesion

// Importando la conexion a el contexto de User
import { useAuth} from "../Context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  // Funcion para cerrar sesion
  const handleSignOut = () => {
    signOut(auth);
  }
  return (
    <header className="container-fluid py-1">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="container m-auto">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <span className="mx-1">
              <BsHouse fontSize="1.9rem"/>
              </span>
              Comercio Ya
            </NavLink>
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
            {/* Menú de Navegación*/}
            <ul className="navbar-nav">
              <li className="nav-item">
                {
                  user ? (
                    <NavLink
                      to={`/negocio/${user.id}`}
                      className="navbar-brand d-flex align-items-center"
                    >
                      <span className="mx-1">
                        <BsShop fontSize="1.9rem" />
                      </span>
                      Mi Negocio
                </NavLink>
                  ): 
                  (
                    <NavLink
                      to="/inicio-sesion"
                      className="navbar-brand d-flex align-items-center"
                    >
                        <span className="mx-1">
                          <BsDoorOpen fontSize="1.9rem" />
                        </span>
                       Iniciar Sesion
                    </NavLink>
                  )
                }
              </li>
              <li className="nav-item">
                 {
                  user ? (
                    <NavLink to="/" className="nav-link d-flex align-items-center" onClick={() => handleSignOut()}>
                        <span className="mx-1">
                          <BsFillDoorClosedFill fontSize="1.9rem" /> 
                        </span>
                      Salir
                    </NavLink>
                  ):
                  (
                    <NavLink to="/crear-cuenta" className="nav-link d-flex align-items-center">
                        <span className="mx-1">
                          <BsPersonPlus fontSize="1.9rem" />
                        </span>
                        Registrate
                    </NavLink>
                  )
                 }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
