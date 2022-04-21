import React, { useState, useEffect } from "react";
import { useAuth } from "./../Context/AuthContext";
import { useParams } from "react-router-dom";
import useObtenerNegocio from "../Hooks/useObtenerNegocio";
//Importando componentes visuales del Negocio
import { Input, Boton } from "./../elementos/ElementosFormulario";
import {
  ContenedorNegocio,
  Formulario,
  ContenedorProductos,
  ContenedorInformacion,
  ListaProductos,
  Titulo,
} from "../elementos/ElementosDelNegocio";
import CheckBoxCategoria from "../elementos/CheckBoxCategoria";
//Importando iconos
import { AiOutlineSave } from "react-icons/ai";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
//Importando Efecto de Carga
import EfectoDeCarga from "../elementos/EfectoDeCarga";
// Importando el toast y Toaster
import toast, { Toaster } from "react-hot-toast";
const Negocio = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [DatosNegocio, setDatosNegocio] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    telefono: "",
    direccion: "",
    productos: "",
  });

  //Destructuro los productos para convertirlos en un array
  const [productos, setProductos] = useState([]);
  //Invoco la funcion que me retorna el negocio del Usuario
  const [negocio] = useObtenerNegocio(id);
  // Estado para las categorias y se lo paso en props a CheckBoxCategoria
  const [categorias, setcategorias] = useState([]);
  //Invoco la funcion de notificacion Toast
  useEffect(() => {
    if (negocio) {
      setTimeout(() => {
        setCargando(false);
        setDatosNegocio({
          nombre: negocio.Nombre,
          descripcion: negocio.Descripcion,
          imagen: negocio.Imagen,
          telefono: negocio.Telefono,
          direccion: negocio.Direccion,
          productos: negocio.Producto,
        });
        let listaProductos = negocio.Producto;
        let listaProductosArray = listaProductos.split(",");
        setProductos(listaProductosArray);
      }, 300);
    }
  }, [negocio, user, cargando]);

  // Funcion que maneja el cambio de los inputs
  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    switch (e.target.name) {
      case "nombre":
        setDatosNegocio({
          ...DatosNegocio,
          nombre: e.target.value,
        });
        break;
      case "descripcion":
        setDatosNegocio({
          ...DatosNegocio,
          descripcion: e.target.value,
        });
        break;
      case "telefono":
        setDatosNegocio({
          ...DatosNegocio,
          telefono: e.target.value,
        });
        break;
      case "direccion":
        setDatosNegocio({
          ...DatosNegocio,
          direccion: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  // Ventana de confirmacion o no
  const notificacion = () => {
    toast((t) => (
      <>
        <span>¿Desea guardar los cambios?</span>
        <Boton
          onClick={() => {
            toast.success("Cambios guardados con exito", {
              style: {
                background: "green",
                color: "white",
                fontSize: ".9rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "10px",
              },
            });
            toast.dismiss(t.id);
          }}
        >
          <BsCheckCircle />
          Si
        </Boton>
        <Boton
          Rojo
          onClick={() => {
            toast.error("Cambios no guardados", {
              style: {
                background: "red",
                color: "white",
                fontSize: ".9rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "10px",
              },
            });
            toast.dismiss(t.id);
          }}
        >
          <BsXCircle />
          No
        </Boton>
      </>
    ));
  };
  // Funcion Submit
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(DatosNegocio);
    notificacion();
  };
  return (
    <>
      {negocio.length !== 0 && !cargando ? (
        <ContenedorNegocio>
          <Toaster />
          <Formulario onSubmit={(e) => onSubmit(e)}>
            <ContenedorInformacion>
              <Input
                type="text"
                name="nombre"
                defaultValue={DatosNegocio.nombre}
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="text"
                name="descripcion"
                defaultValue={DatosNegocio.descripcion}
                onChange={(e) => handleChange(e)}
              />

              <Input
                type="text"
                name="direccion"
                defaultValue={DatosNegocio.direccion}
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="tel"
                name="telefono"
                defaultValue={DatosNegocio.telefono}
                onChange={(e) => handleChange(e)}
              />
              <Boton type="submit">
                <AiOutlineSave />
                Guardar
              </Boton>
            </ContenedorInformacion>
            <ContenedorProductos>
              <Titulo> Tus Productos</Titulo>
              <ListaProductos>
                {productos.map((producto, index) => (
                  <li key={index}>{producto}</li>
                ))}
              </ListaProductos>
              <Titulo>Categorias</Titulo>
              <CheckBoxCategoria categorias={categorias} setcategorias={setcategorias}/>

              <ListaProductos>
                {categorias.map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ListaProductos>
            </ContenedorProductos>
          </Formulario>
        </ContenedorNegocio>
      ) : cargando ? (
        <>
          <EfectoDeCarga />
        </>
      ) : (
        <>
          <h3>No hay negocio registrado</h3>
        </>
      )}
    </>
  );
};

export default Negocio;
