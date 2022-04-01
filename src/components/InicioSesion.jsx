import React, { useState } from "react";
import styled from "styled-components";
import { Formulario, Input, Boton } from "../elementos/ElementosFormulario";
import {NavLink, useNavigate} from 'react-router-dom';
import { ReactComponent as IconoLogin } from "../img/login.svg";
//Importando la funcion de Inicio de Sesion
import IniciarSesion from "../Firebase/IniciarSesion";
// Importando el toast y el Toaster
import toast, {Toaster} from "react-hot-toast";
//Importando iconos
import {BsArrowClockwise} from "react-icons/bs";
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
  const darkMode = {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  }};

  // Evento de submit
  const onSubmit =async (e) => {
    e.preventDefault();
    console.log(datos);

    if(datos.email !== "" && datos.password !== ""){
        try {
            await IniciarSesion(datos.email, datos.password);
            toast.success("Bienvenido", darkMode);
            setTimeout(() => {
              navigate('/');
            }, 700);
        } catch (error) {
            if(error.code === 'auth/wrong-password'){
                toast.error('La contraseña es incorrecta',darkMode);
                setDatos({
                  ...datos,
                  password: ""
                });
            }

            if(error.code === 'auth/user-not-found'){
                toast.error('El usuario no existe', darkMode);
                setDatos({
                  ...datos,
                  email: ""
                });
            }
            console.log(error);
            setDatos({
                email: "",
                password: "",
            });
        }
    }else{
        toast.error('Debes llenar todos los campos',darkMode);
    }
  }
  return (
    <>
      <ContenedorTitulo>
        <Titulo>
          Iniciar Sesión
          <IconoLogin />
        </Titulo>
      </ContenedorTitulo>

      <Formulario onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="CORREO@CORREO.COM"
          value={datos.email}
          onChange={(e) => handleChange(e)}
        />
        <Input 
            type="password" 
            name="password" 
            placeholder="CONTRASEÑA" 
            value={datos.password}
            onChange={(e) => handleChange(e)}
            autoComplete="true"
        />
        <Boton>INICIAR SESIÓN</Boton>
        <NavLink to="/restablecer-contrasena">
            Restablecer Contraseña
            <BsArrowClockwise />
        </NavLink>
      </Formulario>
        <Toaster />
    </>
  );
};

const ContenedorTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 2rem;
`;

const Titulo = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 1px;

  svg {
    margin-left: 1rem;
    margin-top: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  @media (max-width: 340px) {
    word-break: break-all;
  }
`;
export default InicioSesion;
