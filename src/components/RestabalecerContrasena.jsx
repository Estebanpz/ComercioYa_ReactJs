import React, { useState } from "react";
// Importando funcion de Restablecer Contraseña
import RestablecerPassword from "../Firebase/RestablecerPassword";
//Importando el toast y el Toaster
import toast, { Toaster } from "react-hot-toast";
//Importando SVG de password
import { ReactComponent as Password } from "../img/password.svg";
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
      <div className="container-fluid">
        <Password width="9rem" height="auto" className="mx-auto my-2" />
        <div className="row justify-content-center aling-items-center">
          <div className="col-sm-6 col-col-md-6 col-lg-6 col-xl-6">
            <div className="card bg-light my-3 mb-3">
              <div className="card-body">
                <h1>Restablecer Contraseña</h1>
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
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};
export default RestablecerContrasena;
