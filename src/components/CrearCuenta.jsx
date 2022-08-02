import React, { useState } from "react";
import styled from "styled-components";
//Importando los Icons
import { ReactComponent as IconoRegistro } from "./../img/register.svg";
//Importando funciones para validar el formulario
import useFormValidacion from "../Hooks/useFormValidacion";
//Importando la funcion para registar el usuario en Firebase
import RegistrarUsuario from "../Firebase/RegistrarUsuario";
//Importando el sweet alert

import { BsPlusLg } from "react-icons/bs";
const CrearCuenta = () => {
  //Llamando a la funcion que valida el formulario
  const { error, validacion, valido } = useFormValidacion();
  //Manejando errores de Registro de Usuario
  const [errorRegistro, setErrorRegistro] = useState("");
  //Definiendo el estado de los inputs
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    contrasena2: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    validacion(e, name, value);

    setDatos({
      ...datos,
      [name]: value,
    });
  }; //Fin del handleChange

  const onSubmit = async (e) => {
    e.preventDefault();
    if (valido) {
      try {
        await RegistrarUsuario(
          datos.correo,
          datos.contrasena,
          datos.nombre,
          datos.apellido
        );

        setDatos({
          nombre: "",
          apellido: "",
          correo: "",
          contrasena: "",
          contrasena2: "",
        });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorRegistro("El correo ya esta en uso");

            break;

          case "auth/invalid-email":
            setErrorRegistro("El correo no es valido");

            break;

          case "auth/weak-password":
            setErrorRegistro("La contraseña es muy debil");

            break;
          default:
            break;
        }
      }
    } else {
      
    }
  }; // Fin del onSubmit

  //Renderizado del componente
  return (
    <>
      <div className="row w-100">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 justify-content-center">
          <Titulo>
            <h1>Registrate</h1>
          </Titulo>
          <ContenedorSvg>
            <IconoRegistro />
          </ContenedorSvg>

          <div className="col-md-6 offset-md-3">
            <form onSubmit={(e) => onSubmit(e)}>
              {error && error.nombre && <Error>{error.nombre}</Error>}
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="NOMBRE"
                  className="form-control text-center"
                  value={datos.nombre}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="apellido"
                  placeholder="APELLIDO"
                  className="form-control text-center"
                  value={datos.apellido}
                  onChange={(e) => handleChange(e)}
                />
                {error && error.apellido && <Error>{error.apellido}</Error>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="correo"
                  placeholder="CORREO@CORREO.COM"
                  className="form-control text-center"
                  value={datos.correo}
                  onChange={(e) => handleChange(e)}
                />
                {error && error.correo && <Error>{error.correo}</Error>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="contrasena"
                  placeholder="CONTRASEÑA"
                  className="form-control text-center"
                  id="contrasena"
                  autoComplete="true"
                  value={datos.contrasena}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {error && error.contrasena && <Error>{error.contrasena}</Error>}
              <div className="form-group">
                <input
                  type="password"
                  name="contrasena2"
                  placeholder="CONFIRMAR CONTRASEÑA"
                  className="form-control text-center"
                  autoComplete="true"
                  value={datos.contrasena2}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {error && error.contrasena2 && <Error>{error.contrasena2}</Error>}
              <div className="my-1 justify-content-center aling-items-center">
                <button className="btn btn-success btn-block justify-content-center">
                  <span className="aling-items-center justify-content-center">
                    <BsPlusLg className="mx-1" fontSize="1.5rem" />
                  </span>
                  Crear Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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

const Error = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;
export default CrearCuenta;
