import React, { useState, useEffect } from "react";
import { useAuth } from "./../Context/AuthContext";
import { useParams } from "react-router-dom";
import useObtenerNegocio from "../Hooks/useObtenerNegocio";
//Importando componentes visuales del Negocio
import {
  Titulo,
  SubTitulo,
  ContenedorNegocio,
  ContenedorProductos,
  Producto,
  Imagen,
  Telefono,
} from "../elementos/ElementosDelNegocio";
//Importando Efecto de Carga
import EfectoDeCarga from "../elementos/EfectoDeCarga";
const Negocio = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  //Invoco la funcion que me retorna el negocio del Usuario
  const [negocio] = useObtenerNegocio(id);
  //Invoco la funcion de notificacion Toast
  console.log(negocio);
  useEffect(() => {
    if (negocio) {
      setTimeout(() => {
        setCargando(false);
      }, 300);
    }
  }, [negocio, user, cargando]);
  return (
    <>
      {negocio.length !== 0 && !cargando ? (
        <>
          <ContenedorNegocio>
            <Titulo>{negocio.Descripcion}</Titulo>
            <SubTitulo> Productos</SubTitulo>
            <ContenedorProductos>
              <Producto>{negocio.Producto}</Producto>
              <Producto>{negocio.Producto}</Producto>
            </ContenedorProductos>
            <Imagen src={negocio.Imagen} />
            <Telefono>Contacto: {negocio.Telefono}</Telefono>
          </ContenedorNegocio>
        </>
      ) : cargando ? (
        <>
          <EfectoDeCarga />
        </>
      ) : (
        <>
          <SubTitulo>No hay negocio registrado</SubTitulo>
        </>
      )}
    </>
  );
};

export default Negocio;
