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
  const { error, setError } = useFormValidacion();
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
  const [valido, setValido] = useState(false);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setDatos({
      ...datos,
      [name]: value,
    });
  }; //Fin del handleChange

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(valido);
    const regex = /^[a-zA-Z\\áéíóúÁÉÍÓÚñÑ\s]*$/;
    const regexCorreo =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const regexContrasena = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d0-9]{8,}$/
    if (!regex.test(datos.nombre) || datos.nombre.length === 0) {
      setError({
        ...error,
        nombre: "Digite su nombre sin números o caracteres especiales.",
      });
      setValido(false);
      return;
    }

    if (!regex.test(datos.apellido) || datos.apellido.length === 0) {
      setError({
        ...error,
        apellido: "Digite su apellido sin números o caracteres especiales",
      });
      setValido(false);
      return;
    }

    if (!regexCorreo.test(datos.correo) || datos.correo.length === 0) {
      setError({
        ...error,
        correo: "Digite un correo válido.",
      });
      setValido(false);
      return;
    }

    if (datos.contrasena !== null && datos.contrasena2 !== null) {
      if (datos.contrasena === datos.contrasena2) {
        if (!regexContrasena.test(datos.contrasena)) {
          setError({
            ...error,
            contrasena:
              "La Contraseña debe ser mínimo de 8 Caracteres. 1 Mayuscula y 1 Número.",
          });
          setValido(false);
        } else {
          setValido(true);
        }
      } else {
        setError({
          ...error,
          contrasena2: "Las contraseñas deben coincidir.",
        });
        setValido(false);
      }
    } else {
      setValido(false);
      setError({
        ...error,
        contrasena: "No puede quedar la contraseña vacia.",
      });
    }

    setValido(
      regex.test(
        datos.nombre &&
          regex.test(datos.apellido) &&
          regexContrasena.test(datos.contrasena) &&
          regexCorreo.test(datos.correo)
      )
    );
        
    if (valido) {
      setError({})
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
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <ContenedorSvg>
              <IconoRegistro />
            </ContenedorSvg>
            <div className="text-center p-2">
              <h2>
                Comercio Ya te ayuda a que más personas logren visualizarte y
                llegues más lejos.
              </h2>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6 mt-5">
            <div className="card" style={{ backgroundColor: "#4895EF", borderRadius:'1rem' }}>
              <div className="card-body">
                <form onSubmit={(e) => onSubmit(e)}>
                  {error && error.nombre && <Error>{error.nombre}</Error>}
                  {errorRegistro && <Error>{errorRegistro}</Error>}
                  <div className="form-group">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombres completos"
                      value={datos.nombre}
                      autoFocus
                      className="form-control text-center"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="apellido"
                      placeholder="Apellidos completos"
                      value={datos.apellido}
                      className="form-control text-center"
                      onChange={(e) => handleChange(e)}
                    />
                    {error && error.apellido && <Error>{error.apellido}</Error>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="correo"
                      placeholder="Correo@ejemplo.com"
                      value={datos.correo}
                      className="form-control text-center"
                      onChange={(e) => handleChange(e)}
                    />
                    {error && error.correo && <Error>{error.correo}</Error>}
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="contrasena"
                      placeholder="Contraseña"
                      id="contrasena"
                      autoComplete="true"
                      className="form-control text-center"
                      value={datos.contrasena}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {error && error.contrasena && (
                    <Error>{error.contrasena}</Error>
                  )}
                  <div className="form-group">
                    <input
                      type="password"
                      name="contrasena2"
                      placeholder="Confirmar Contraseña"
                      autoComplete="true"
                      className="form-control text-center"
                      value={datos.contrasena2}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {error && error.contrasena2 && (
                    <Error>{error.contrasena2}</Error>
                  )}
                  <ContenedorBtns>
                    <Btn>
                      <span>
                        <BsPlusLg className="mx-1" fontSize="1.5rem" />
                      </span>
                      Crear Cuenta
                    </Btn>
                  </ContenedorBtns>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Contenedor = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  background-color: #fcfcfc;
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
  color: #1e0065;
  margin: 1rem;
  padding: 0.4rem;
  &::placeholder {
    color: rgba(rgb(255, 255, 255));
  }

  &:hover {
    transition: all ease-in-out 0.5s;
    border-bottom: 2px solid #101010;
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
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: #fcfcfc;
  color: #101010;
  border-radius: 0.5rem;

  &:hover {
    transition: all ease-in-out 0.4s;
    background-color: #101010;
    color: #fcfcfc;
  }

  & > span > svg {
    width: 1rem;
    height: auto;
  }
`;

const ContenedorSvg = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  & > svg {
    width: 60%;
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
  color: #101010;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;
export default CrearCuenta;
