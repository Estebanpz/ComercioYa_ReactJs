import React, { useState } from "react";
import styled from "styled-components";
//Importando los Icons
import { ReactComponent as IconoRegistro } from "./../img/register.svg";
//Importando funciones para validar el formulario
import useFormValidacion from "../Hooks/useFormValidacion";
//Importando la funcion para registar el usuario en Firebase
import RegistrarUsuario from "../Firebase/RegistrarUsuario";
//Importando el toast y Toaster para las notificaciones
import toast, { Toaster } from "react-hot-toast";
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
        toast.success("Usuario Registrado con Exito", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1.5rem",
          },
        });

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
            toast.error(errorRegistro);
            break;

          case "auth/invalid-email":
            setErrorRegistro("El correo no es valido");
            toast.error(errorRegistro);
            break;

          case "auth/weak-password":
            setErrorRegistro("La contraseña es muy debil");
            toast.error(errorRegistro);
            break;
          default:
            break;
        }
      }
    } else {
      toast.error("Por favor llena todos los campos");
    }
  }; // Fin del onSubmit

  //Renderizado del componente
  return (
    <>
      <div className="container-fluid p-2 my-3">
        <IconoRegistro
          className="mx-auto mb-2"
          style={{ width: "9rem", height: "auto" }}
        />
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <h1 className="text-dark">Registro</h1>
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
                <button className="btn btn-success w-50 justify-content-center">
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

      <Toaster
        position="top-center"
        toastOptions={{
          progress: true,
        }}
      />
    </>
  );
};

const Error = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;
export default CrearCuenta;
