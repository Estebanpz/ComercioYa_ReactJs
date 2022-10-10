import React, { useState } from "react";
import styled from "styled-components";
//Importando los Icons
import { ReactComponent as IconoRegistro } from "./../img/register.svg";
//Importando funciones para validar el formulario
import useFormValidacion from "../Hooks/useFormValidacion";
//Importando la funcion para registar el usuario en Firebase
import RegistrarUsuario from "../Firebase/RegistrarUsuario";
//Importando el sweet alert
import swal from "sweetalert";
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

    if(validacion(e, name, value)){
      setDatos({
        ...datos,
        [name]: value,
      });
    }else{
      swal({
        title:"error",
        text: error?.name,
        icon:"error",
      });
    }

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
            swal("Error", "El correo ya esta en uso", "error");
            break;

          case "auth/invalid-email":
            setErrorRegistro("El correo no es valido");
            swal("Error", "El correo no es valido", "error");
            break;

          case "auth/weak-password":
            setErrorRegistro("La contraseña es muy debil");
            swal("Error", "La contraseña es muy debil", "info");
            break;
          default:
            swal(
              "Error",
              "Por favor verifique si hay algún dato erroneo",
              "error"
            );
            break;
        }
      }
    } else {
    }
  }; // Fin del onSubmit

  //Renderizado del componente
  return (
    <Contenedor>
      <ContenedorSvg>
        <IconoRegistro />
      </ContenedorSvg>

      <ContenedorFormulario>
        <form onSubmit={(e) => onSubmit(e)}>
          {error && error.nombre && <Error>{error.nombre}</Error>}
          <ContenedorInputs>
            <Input
              type="text"
              name="nombre"
              placeholder="NOMBRE"
              value={datos.nombre}
              autoFocus
              onChange={(e) => handleChange(e)}
            />
          </ContenedorInputs>

          <ContenedorInputs>
            <Input
              type="text"
              name="apellido"
              placeholder="APELLIDO"
              value={datos.apellido}
              onChange={(e) => handleChange(e)}
            />
            {error && error.apellido && <Error>{error.apellido}</Error>}
          </ContenedorInputs>
          <ContenedorInputs>
            <Input
              type="email"
              name="correo"
              placeholder="CORREO@CORREO.COM"
              value={datos.correo}
              onChange={(e) => handleChange(e)}
            />
            {error && error.correo && <Error>{error.correo}</Error>}
          </ContenedorInputs>

          <ContenedorInputs className="form-group">
            <Input
              type="password"
              name="contrasena"
              placeholder="CONTRASEÑA"
              id="contrasena"
              autoComplete="true"
              value={datos.contrasena}
              onChange={(e) => handleChange(e)}
            />
          </ContenedorInputs>
          {error && error.contrasena && <Error>{error.contrasena}</Error>}
          <ContenedorInputs className="form-group">
            <Input
              type="password"
              name="contrasena2"
              placeholder="CONFIRMAR CONTRASEÑA"
              autoComplete="true"
              value={datos.contrasena2}
              onChange={(e) => handleChange(e)}
            />
          </ContenedorInputs>
          {error && error.contrasena2 && <Error>{error.contrasena2}</Error>}
          <ContenedorBtns>
            <Btn>
              <span>
                <BsPlusLg className="mx-1" fontSize="1.5rem" />
              </span>
              Crear Cuenta
            </Btn>
          </ContenedorBtns>
        </form>
      </ContenedorFormulario>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  background-color: #000000;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContenedorFormulario = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  > form {
    display: grid;
    justify-content: center;
    align-items: center;
  }
`;

const ContenedorInputs = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  background-color: none;
`;
const Input = styled.input`
  width: 25rem;
  height: auto;
  display: block;
  border: none;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 0.1rem;
  color: #fca311;
  margin: 1rem;
  padding: 0.4rem;
  &::placeholder {
    color: rgba(rgb(255, 255, 255));
  }

  &:hover {
    transition: all ease-in-out 0.5s;
    border-bottom: 2px solid #fba410;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }
`;

const ContenedorBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Btn = styled.button`
  width: auto;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: #fca311;
  color: #fff;
  border-radius: 0.5rem;
`;

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
  color: #ccc;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;
export default CrearCuenta;
