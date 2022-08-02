import React from "react";
import useObtenerNegocio from "../Hooks/useObtenerNegocio";
import CrearNegocio from "./CrearNegocio";
//import { ReactComponent as IconoCrearNegocio } from "../img/crear-negocio-persona.svg";
const Negocio = () => {
  
  const [negocio] =  useObtenerNegocio();
  return(
    <>

    {console.log(negocio)}
      <CrearNegocio negocio={negocio}/>
    </>
  )
}

export default Negocio;
