import React, { useState, useEffect } from "react";
import { GuardarNegocio } from "../Firebase/GuardarNegocio";
import actualizarNegocio from "../Firebase/ActualizarNegocio";
import useObtenerNegocios from "./../Hooks/useObtenerNegocios";
// Importando el UseAuth para poder obtener el usuario actual
import { useAuth } from "../Context/AuthContext";
import { ReactComponent as IconoCrearNegocio } from "./../img/crear-negocio.svg";
import { ReactComponent as IconoCrearNegocio2 } from "./../img/crear-negocio-2.svg";
import { ReactComponent as IconoCrearNegocio3 } from "./../img/crear-negocio-3.svg";
import { BsPlusCircleDotted, BsXLg } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
const CrearNegocio = ({ negocio }) => {
  // Obteniendo el usuario actual
  const { user } = useAuth();
  const [errorProducto, setErrorProducto] = useState(true);
  const [errorCategoria, setErrorCategoria] = useState(true);
  const [stateProductos, cambiarStateProductos] = useState([]);
  const [stateCategorias, cambiarStateCategorias] = useState([]);
  const [editanto, setEditanto] = useState(false);
  const [negocios, unSubscribe] = useObtenerNegocios();
  //Estado para los datos del negocio
  const [datos, setDatos] = useState({
    producto: "",
    categoria: "",
    nombre: "",
    descripcion: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    forma_de_pago: "Efectivo",
  });

  useEffect(() => {
      if (negocio) {
        setEditanto(true);
        setDatos({
          ...datos,
          nombre: negocio.nombre,
          descripcion: negocio.descripcion,
          ciudad: negocio.ciudad,
          direccion: negocio.direccion,
          telefono: negocio.telefono,
          forma_de_pago: negocio.forma_de_pago,
        });

        cambiarStateCategorias(negocio.categorias);
        cambiarStateProductos(negocio.productos);
      }
  

    return () => {
      unSubscribe();
    };
  }, [user, negocio]);

  const handleDatos = (e) => {
    //Nombre del Negocio
    if (e.target.name === "nombre") {
      const { value } = e.target;
      setDatos({
        ...datos,
        nombre: value,
      });
    }
    //Descripción del Negocio

    if (e.target.name === "descripcion") {
      const { value } = e.target;
      setDatos({
        ...datos,
        descripcion: value,
      });
    }

    // Formas de Pago
    if (e.target.name === "formas-pagos") {
      const { value } = e.target;
      setDatos({
        ...datos,
        forma_de_pago: value,
      });
    }

    // Ciudad del Negocio
    if (e.target.name === "ciudad") {
      const { value } = e.target;
      setDatos({
        ...datos,
        ciudad: value,
      });
    }

    // Dirección del Negocio
    if (e.target.name === "direccion") {
      const { value } = e.target;
      setDatos({
        ...datos,
        direccion: value,
      });
    }

    // Teléfono del Negocio

    if (e.target.name === "telefono") {
      const { value } = e.target;
      setDatos({
        ...datos,
        telefono: Number(value),
      });
    }

    // Producto
    if (e.target.name === "producto") {
      const { value } = e.target;
      setDatos({
        ...datos,
        producto: value,
      });

      if (value !== "" || value !== undefined) {
        setErrorProducto(!errorProducto);
      }
    }

    // Categoria
    if (e.target.name === "categoria") {
      const { value } = e.target;
      setDatos({
        ...datos,
        categoria: value,
      });
      value.length >= 0
        ? setErrorCategoria(!errorCategoria)
        : setErrorCategoria(false);
    }
  };

  // Agregar Productos
  const agregarProductos = () => {
    cambiarStateProductos([
      ...stateProductos,
      {
        id: uuidv4(),
        nombre: datos.producto,
      },
    ]);

    setDatos({
      producto: "",
      ...datos,
    });
  };

  //Agregar Categorias
  const agregarCategorias = () => {
    cambiarStateCategorias([
      ...stateCategorias,
      {
        id: uuidv4(),
        nombre: datos.categoria,
      },
    ]);

    setDatos({
      categoria: "",
      ...datos,
    });
  };

  // Quitar Productos
  const eliminarProducto = (id) => {
    cambiarStateProductos(
      stateProductos.filter((producto) => producto.id !== id)
    );
  };

  // Quitar Categorias
  const eliminarCategoria = (id) => {
    cambiarStateCategorias(
      stateCategorias.filter((categoria) => categoria.id !== id)
    );
  };

  // Comprobando si ya existe ese documento para el comerciante
  //const yaesta = negocios.some((negocio) =>  negocio?.userId === user.uid);
  // Manejador del evento Submit del Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    delete datos.categoria;
    delete datos.producto;

    try {
      setDatos({
        productos: stateProductos,
        categorias: stateCategorias,
        userId: user.uid,
        ...datos,
      });
      if (!editanto) {
        setTimeout(async () => {
          await GuardarNegocio({
            nombre: datos.nombre,
            ciudad: datos.ciudad,
            telefono: datos.telefono,
            direccion: datos.direccion,
            descripcion: datos.descripcion,
            productos: stateProductos,
            categorias: stateCategorias,
            userId: user.uid,
          });
        }, 200);
        swal("Completado", "Negocio Registrado", "success");
        setEditanto(!editanto);
      } else if (editanto) {
        setDatos({
          nombre: datos.nombre,
          ciudad: datos.ciudad,
          telefono: datos.telefono,
          direccion: datos.direccion,
          descripcion: datos.descripcion,
          productos: stateProductos,
          categorias: stateCategorias,
          userId: user.uid,
        });
        if (actualizarNegocio(negocio.id, {
          nombre: datos.nombre,
          ciudad: datos.ciudad,
          telefono: datos.telefono,
          direccion: datos.direccion,
          descripcion: datos.descripcion,
          productos: stateProductos,
          categorias: stateCategorias,
          userId: user.uid,
        })) {
          swal("Modificación", "Actualizacion realizada", "success");
          setEditanto(!editanto);
        }

        console.log(datos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-sm-6 col-md-6 col lg-6 col-xl-6">
          <ContenedorSvg>
            <IconoCrearNegocio />
          </ContenedorSvg>
        </div>
        <div className="col-sm-6 col-md-6 col lg-6 col-xl-6 justify-content-center">
          <Titulo>{editanto ? "TU NEGOCIO" : "REGISTRA TU NEGOCIO"}</Titulo>
          <ContenedorFomulario>
            <div className="form-group">
              <Label htmlFor="nombre">Nombre de mi negocio</Label>
              <Input
                name="nombre"
                type="text"
                id="nombre"
                autoComplete="on"
                value={datos.nombre || ""}
                onChange={(e) => handleDatos(e)}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                type="text"
                name="ciudad"
                id="ciudad"
                autoComplete="on"
                value={datos.ciudad || ""}
                onChange={(e) => handleDatos(e)}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                type="text"
                name="direccion"
                id="direccion"
                autoComplete="on"
                value={datos.direccion || ""}
                onChange={(e) => handleDatos(e)}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="telefono">Contacto</Label>
              <Input
                type="tel"
                name="telefono"
                id="telefono"
                autoComplete="on"
                value={datos.telefono || ""}
                onChange={(e) => handleDatos(e)}
              />
            </div>
          </ContenedorFomulario>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-5">
          <ContenedorFomulario>
            <Subtitulo>Productos</Subtitulo>
            <ContenedorProductos id="contenedorProductos">
              <Input
                type="text"
                name="producto"
                value={datos.producto || ''}
                autoComplete="on"
                onChange={(e) => handleDatos(e)}
              />
              <BsPlusCircleDotted
                as="input"
                type="button"
                onClick={() => agregarProductos()}
                color="#0c1ae9"
                size="1.6rem"
                className="ml-1"
              />

              {stateProductos.length > 0 &&
                stateProductos.map((product) => {
                  return (
                    <ElementoLista key={product.id}>
                      <span>{product.nombre}</span>
                      <BsXLg
                        as="input"
                        type="button"
                        onClick={() => eliminarProducto(product.id)}
                        color="#e41a24"
                        size="1rem"
                      />
                    </ElementoLista>
                  );
                })}
            </ContenedorProductos>
          </ContenedorFomulario>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-5">
          <ContenedorSvg>
            <IconoCrearNegocio2 />
          </ContenedorSvg>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-5">
          <ContenedorFomulario>
            <Subtitulo>Categorias</Subtitulo>
            <ContenedorProductos>
              <Input
                type="text"
                name="categoria"
                value={datos.categoria || ""}
                autoComplete="on"
                onChange={(e) => handleDatos(e)}
              />
              <BsPlusCircleDotted
                as="input"
                type="button"
                onClick={() => agregarCategorias()}
                color="#0c1ae9"
                size="1.6rem"
                className="ml-1"
              />

              {stateCategorias.length > 0 &&
                stateCategorias.map((categoria) => {
                  return (
                    <ElementoLista key={categoria.id}>
                      <span>{categoria.nombre}</span>
                      <BsXLg
                        as="input"
                        type="button"
                        onClick={() => eliminarCategoria(categoria.id)}
                        color="#e41a24"
                        size="1rem"
                      />
                    </ElementoLista>
                  );
                })}
            </ContenedorProductos>
          </ContenedorFomulario>
          <button className="btn btn-success btn-block">
            <span>
              <FiUploadCloud />
            </span>
            {editanto ? "Actualizar" : "Guardar"}
          </button>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-5">
          <ContenedorSvg>
            <IconoCrearNegocio3 />
          </ContenedorSvg>
        </div>
      </form>
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
    width: 70%;
    height: auto;
    padding: 0;
    margin: 0;
  }
`;

const ContenedorFomulario = styled.div`
  margin: 3rem 1rem;
  text-align: center;
  box-shadow: 6px 10px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1rem;
  background-image: linear-gradient(
    0deg,
    hsl(204deg 76% 50%) 0%,
    hsl(208deg 70% 60%) 11%,
    hsl(210deg 66% 66%) 23%,
    hsl(211deg 61% 71%) 34%,
    hsl(212deg 56% 75%) 45%,
    hsl(213deg 50% 78%) 56%,
    hsl(214deg 42% 82%) 67%,
    hsl(214deg 33% 85%) 78%,
    hsl(215deg 19% 88%) 89%,
    hsl(0deg 0% 90%) 100%
  );
`;

const ContenedorProductos = styled.div`
  width: 100%;

  & > div > svg {
    cursor: pointer;
    margin-left: 0.5rem;
    font-size: 1.6rem;
    color: #000;
  }

  & > input {
    font-size: 1.5rem; /* 40px */
    text-transform: uppercase;
    text-align: center;
    border: none;
    border-bottom: 2px solid #1e92e0;
    outline: none;
    width: 77%;
    border-radius: 5px;

    @media (min-width: 990px) {
      font-size: 1.1rem;
    }

    @media (min-width: 960px) {
      font-size: 0.8rem;
    }

    @media (max-width: 767px) {
      font-size: 0.5rem;
    }
  }
`;

const Input = styled.input`
  font-size: 1.5rem; /* 40px */
  text-transform: uppercase;
  text-align: center;
  border: none;
  border-bottom: 2px solid #1e92e0;
  outline: none;
  width: 77%;
  border-radius: 5px;

  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1rem; /* 24px */
  }
`;

const Titulo = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 2.5rem; /* 40px */
  text-align: center;
  box-shadow: 6px 10px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1.5rem; /* 32px */
  }
`;

const Subtitulo = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 2rem; /* 40px */
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1rem; /* 32px */
  }
`;

const Label = styled.label`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1-2rem; /* 40px */
  display: block;
  color: #0c0c0c;
  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1.5rem; /* 32px */
  }
`;

const ElementoLista = styled.div`
  text-transform: uppercase;
  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1rem; /* 24px */
  }
`;
export default CrearNegocio;
