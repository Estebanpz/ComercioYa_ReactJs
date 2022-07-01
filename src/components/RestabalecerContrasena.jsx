import React, { useState } from "react";
// Importando funcion de Restablecer Contraseña
import RestablecerPassword from "../Firebase/RestablecerPassword";
//Importando el toast y el Toaster
import toast, { Toaster } from "react-hot-toast";
//Importando SVG de password
import { ReactComponent as Password } from "../img/password.svg";
import styled from "styled-components";
const RestablecerContrasena = () => {
  const [email, setEmail] = useState("");
  //Styles del toast mode Dark
  const darkMode = {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  };
  // handleChange
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    if (email !== "") {
      try {
        await RestablecerPassword(email);
        toast.success("Se ha enviado un correo a tu cuenta.", darkMode);
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          toast.error("El usuario no existe", darkMode);
        }
        setEmail("");
      }
    } else {
      toast.error("Proporciona un email.", darkMode);
      setEmail("");
    }
  };
  return (
    <>
      <div className="row w-100">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2">
          <Titulo>
            <h1>Restablecer Contraseña</h1>
          </Titulo>
          <ContenedorSvg>
            <Password />
          </ContenedorSvg>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 offset-sm-3 offset-md-3 offset-lg-3 offset-xl-3 mt-2">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Correo Electronico"
                className="form-control text-center"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="my-2">
              <button type="submit" className="btn btn-primary btn-block">
                Restablecer Contraseña
              </button>
            </div>
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
    border-radius: 10%;
    box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.4);
  }
`;

const Titulo = styled.div`
  margin-top: 2rem;
  padding: 0;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
  text-align: center;
`;
export default RestablecerContrasena;
