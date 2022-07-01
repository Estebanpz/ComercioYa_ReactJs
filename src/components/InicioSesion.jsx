import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as IconoLogin } from "../img/login.svg";
//Importando la funcion de Inicio de Sesion
import IniciarSesion from "../Firebase/IniciarSesion";
// Importando el toast y el Toaster
import toast, { Toaster } from "react-hot-toast";
//Importando iconos
import { BsArrowClockwise, BsBoxArrowInRight } from "react-icons/bs";
import styled from "styled-components";
const InicioSesion = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  //Manejo de cambios en los inputs
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //Styles del toast mode Dark
  const darkMode = {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  };

  // Evento de submit
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(datos);

    if (datos.email !== "" && datos.password !== "") {
      try {
        await IniciarSesion(datos.email, datos.password);
        toast.success("Bienvenido", darkMode);
        setTimeout(() => {
          navigate("/");
        }, 700);
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          toast.error("La contraseña es incorrecta", darkMode);
          setDatos({
            ...datos,
            password: "",
          });
        }

        if (error.code === "auth/user-not-found") {
          toast.error("El usuario no existe", darkMode);
          setDatos({
            ...datos,
            email: "",
          });
        }
        console.log(error);
        setDatos({
          email: "",
          password: "",
        });
      }
    } else {
      toast.error("Debes llenar todos los campos", darkMode);
    }
  };
  return (
    <>
      <div className="row w-100">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Titulo>
            <h1>Inicia Sesión</h1>
          </Titulo>
          <ContenedorSvg>
            <IconoLogin />
          </ContenedorSvg>
        </div>

        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 offset-sm-3 offset-md-3 offset-lg-3 offset-xl-3 mt-2">
          {/* Formulario de Inicio de Sesion */}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="CORREO@CORREO.COM"
                className="form-control text-center"
                value={datos.email}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="CONTRASEÑA"
                className="form-control text-center"
                value={datos.password}
                onChange={(e) => handleChange(e)}
                autoComplete="true"
              />
            </div>
            <div className="my-1 justify-content-center aling-items-center">
              <button className="btn btn-success btn-block justify-content-center">
                <span className="aling-items-center justify-content-center">
                  <BsBoxArrowInRight className="mx-2" fontSize="1.5rem" />
                </span>
                Iniciar Sesión
              </button>
            </div>
            <NavLink
              to="/restablecer-contrasena"
              className="d-flex aling-items-center justify-content-center"
            >
              <span className="mx-1">
                <BsArrowClockwise fontSize="1.5rem" />
              </span>
              Restablecer Contraseña
            </NavLink>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

const ContenedorSvg = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  & > svg {
    width: 40%;
    height: auto;
    padding: 0;
    margin: 0;
  }
`;

const Titulo = styled.div`
  margin-top: 2rem;
  padding: 0;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
  text-align: center;
`;

export default InicioSesion;
