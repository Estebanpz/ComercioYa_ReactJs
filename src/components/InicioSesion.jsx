import React, { useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import { ReactComponent as IconoLogin } from "../img/login.svg";
//Importando la funcion de Inicio de Sesion
import IniciarSesion from "../Firebase/IniciarSesion";
// Importando el toast y el Toaster
import toast, {Toaster} from "react-hot-toast";
//Importando iconos
import {BsArrowClockwise, BsBoxArrowInRight} from "react-icons/bs";
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
      <div className="container-fluid p-2 my-3">
        <IconoLogin className="mx-auto mb-2" style={{width: '9rem', height:'auto'}}/>
        <div className="row justify-content-center aling-items-center">
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
            {/* Formulario de Inicio de Sesion */}
            <h1 className="text-dark">Inicia Sesión</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="email" 
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
                <button className="btn btn-success w-50 justify-content-center">
                  <span className="aling-items-center justify-content-center">
                    <BsBoxArrowInRight className="mx-2" fontSize="1.5rem"/>
                  </span>
                  Iniciar Sesión
                </button>
            </div>
              <NavLink to="/restablecer-contrasena" className="d-flex aling-items-center justify-content-center">
                <span className="mx-1">
                  <BsArrowClockwise fontSize="1.5rem" />
                </span>
                Restablecer Contraseña
              </NavLink>
          </form>
          </div>
        </div>
      </div>
        <Toaster />
    </>
  );
};
export default InicioSesion;
