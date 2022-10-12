import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./../Context/AuthContext";
import { ReactComponent as IconoLogin } from "../img/login.svg";
//Importando la funcion de Inicio de Sesion
import IniciarSesion from "../Firebase/IniciarSesion";
// Importando el sweet alert
import swal from "sweetalert";
//Importando iconos
import { BsArrowClockwise, BsBoxArrowInRight } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
const InicioSesion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const [ver, setVer] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    } else if (user && !user.emailVerified) {
      swal("Usuario", "El correo registrado no se ha verificado", "info");
      navigate("/inicio-sesion");
    }
  }, [user, navigate]);

  //Manejo de cambios en los inputs
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Evento de submit
  const onSubmit = async (e) => {
    e.preventDefault();

    if (datos.email !== "" && datos.password !== "") {
      try {
        if (await IniciarSesion(datos.email, datos.password)) {
          navigate("/");
        }
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          setDatos({
            ...datos,
            password: "",
          });
          swal("Error", "contraseña incorrecta", "error");
          document.getElementById("email").focus();
        }

        if (error.code === "auth/user-not-found") {
          setDatos({
            ...datos,
            email: "",
          });
          swal("Error", "usuario no registrado", "error");
          document.getElementById("password").focus();
        }
        console.log(error);
      }
    } else {
      swal(
        "Importante",
        "Por favor proporcione un correo y contraseña",
        "info"
      );
    }
  };

  const handleToogle = () => {
    let inputPassword = document.getElementById("password");
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
      setVer(true);
    } else {
      inputPassword.type = "password";
      setVer(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6 mt-5">
            <ContenedorSvg>
              <IconoLogin />
            </ContenedorSvg>
            <div className="text-center p-2 m-2">
              <h2>
                Comercio Ya te ayuda a que más personas logren visualizarte y
                llegues más lejos.
              </h2>
            </div>
          </div>

          <div className="col sm-6 col-md-6 col-xl-6 col-lg-6 mt-5">
            <div
              className="card"
              style={{ backgroundColor: "#4895EF", borderRadius: "1rem" }}
            >
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electronico"
                      value={datos.email}
                      autoFocus
                      className="form-control text-center"
                      onChange={(e) => handleChange(e)}
                      id="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      value={datos.password}
                      onChange={(e) => handleChange(e)}
                      autoComplete="true"
                      className="form-control text-center"
                      id="password"
                    />
                    <div className="d-inline-block">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleToogle()}
                      >
                        {ver ? (
                          <FaEye
                            style={{ color: "#560BAD", fontSize: "1.4rem" }}
                          />
                        ) : (
                          <FaEyeSlash
                            style={{ color: "#560BAD", fontSize: "1.4rem" }}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <ContenedorBtns>
                    <Btn>
                      <span>
                        <BsBoxArrowInRight className="mx-1" />
                      </span>
                      Iniciar Sesión
                    </Btn>
                  </ContenedorBtns>
                  <div className="text-center">
                    <NavLink
                      to="/restablecer-contrasena"
                      style={{ color: "#FCFCFC" }}
                    >
                      <span>
                        <BsArrowClockwise fontSize="1.5rem" />
                      </span>
                      Restablecer Contraseña
                    </NavLink>
                  </div>
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
  height: 100vh;
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

const ContenedorSvg = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 60%;
    height: auto;
    padding: 0;
    margin: 0;
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
    width: 1.4rem;
    height: auto;
    margin: 1rem 0;
  }
`;

const Titulo = styled.div`
  margin-top: 2rem;
  padding: 0;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
  text-align: center;
`;

export default InicioSesion;
