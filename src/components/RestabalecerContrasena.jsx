import React, { useState } from "react";
// Importando funcion de Restablecer Contraseña
import RestablecerPassword from "../Firebase/RestablecerPassword";
//Importando el sweet alert
import swal from "sweetalert";
//Importando SVG de password
import { ReactComponent as Password } from "../img/password.svg";
import {
  Contenedor,
  ContenedorFormulario,
  ContenedorInputs,
  ContenedorSvg,
  ContenedorBtns,
  Btn,
  Input,
} from "./../elementos/ElementosFormulario";
const RestablecerContrasena = () => {
  const [email, setEmail] = useState("");
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
        try {
          await RestablecerPassword(email);
          swal(
            "Completado",
            "Revisa tu bandeja en el correo registrado y verificalo",
            "success"
          );
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          swal(
            "Error",
            "El email introducido no existe, por favor verifica los datos",
            "error"
          );
        }
        setEmail("");
      }
    } else {
      swal("Espera un momento", "Proporciona un email valido", "error");
      setEmail("");
    }
  };
  return (
    <Contenedor>
      <strong>
        <h1 style={{ color: "whitesmoke" }}>Restablecer Contraseña</h1>
      </strong>
      <ContenedorSvg>
        <Password />
      </ContenedorSvg>

      <ContenedorFormulario>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ContenedorInputs>
            <Input
              type="email"
              name="email"
              placeholder="Correo Electronico"
              className="form-control text-center"
              value={email}
              onChange={(e) => handleChange(e)}
            />
          </ContenedorInputs>

          <ContenedorBtns>
            <Btn type="submit">
              Restablecer Contraseña
            </Btn>
          </ContenedorBtns>
        </form>
      </ContenedorFormulario>
    </Contenedor>
  );
};

export default RestablecerContrasena;
