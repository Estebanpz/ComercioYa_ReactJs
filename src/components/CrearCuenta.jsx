import React, { useState } from "react";
import styled from "styled-components";
//Importando los elementos del formulario
import { Formulario, Input, Boton } from "../elementos/ElementosFormulario";
//Importando los Icons
import { ReactComponent as IconoRegistro } from "./../img/register.svg";
//Importando funciones para validar el formulario
import useFormValidacion from "../Hooks/useFormValidacion";
//Importando la funcion para registar el usuario en Firebase
import { RegistrarUsuario } from "../Firebase/RegistrarUsuario";
const CrearCuenta = () => {
  //Llamando a la funcion que valida el formulario
  const {error, validacion, valido} = useFormValidacion();
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


      validacion(e,name, value);

      setDatos({
        ...datos,
        [name]: value,
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(valido){
      alert("Formulario valido");
      RegistrarUsuario(datos.correo, datos.contrasena,datos.nombre,datos.apellido);
    }else{
      alert("Formulario invalido");
    }

    setDatos({
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      contrasena2: "",
    });
  }

  return (
    <>
      <Titulo>
        Registrate como Comerciante
        <IconoRegistro />
      </Titulo>
      <Formulario onSubmit={(e)=> onSubmit(e)}>
        {error && error.nombre &&<Error>{error.nombre}</Error>}
        <Input
          type="text"
          name="nombre"
          placeholder="NOMBRE"
          value={datos.nombre}
          onChange={(e) => handleChange(e)}
        />
        <Input 
          type="text" 
          name="apellido" 
          placeholder="APELLIDO"
          value={datos.apellido}
          onChange={(e) => handleChange(e)}
        />
        {error && error.apellido && <Error>{error.apellido}</Error>}
        <Input
          type="email"
          name="correo"
          placeholder="CORREO@CORREO.COM"
          value={datos.correo}
          onChange={(e) => handleChange(e)}
        />
        {error && error.correo &&<Error>{error.correo}</Error>}
        <Input type="password"
               name="contrasena" 
               placeholder="CONTRASEÑA" 
               id="contrasena"
               autoComplete="true"
               value={datos.contrasena}
               onChange={(e) => handleChange(e)}
        />
        {error && error.contrasena &&<Error>{error.contrasena}</Error>}
        <Input
          type="password"
          name="contrasena2"
          placeholder="CONFIRMAR CONTRASEÑA"
          autoComplete="true"
          value={datos.contrasena2}
          onChange={(e) => handleChange(e)}
        />
        {error && error.contrasena2 &&<Error>{error.contrasena2}</Error>}
        <Boton>CREAR CUENTA</Boton>
      </Formulario>
    </>
  );
};

const Titulo = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
  margin-bottom: 2rem;

  svg {
    margin-left: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  @media (max-width: 340px) {
    word-break: break-all;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;
export default CrearCuenta;
