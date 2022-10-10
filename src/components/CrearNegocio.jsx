import React, { useState, useEffect } from "react";
import { GuardarNegocio } from "../Firebase/GuardarNegocio";
import actualizarNegocio from "../Firebase/ActualizarNegocio";
import useObtenerNegocios from "./../Hooks/useObtenerNegocios";
// Importando el UseAuth para poder obtener el usuario actual
import { useAuth } from "../Context/AuthContext";
import SubirImagen from "./../Firebase/SubirImagen";
import DescargarImagen from "../Firebase/DescargarImagen";
import { BsPlusCircleDotted, BsXLg } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
const CrearNegocio = ({ negocio }) => {
  // Obteniendo el usuario actual
  const { user } = useAuth();
  const [stateProductos, cambiarStateProductos] = useState([]);
  const [stateCategorias, cambiarStateCategorias] = useState([]);
  const [editanto, setEditanto] = useState(false);
  const [negocios, unSubscribe] = useObtenerNegocios();
  const [mensaje, setMensaje] = useState("");
  //Estado para los datos del negocio
  const [datos, setDatos] = useState({
    producto: "",
    categoria: "",
    nombre: "",
    descripcion: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    imagen: "",
    forma_de_pago: "Efectivo",
  });
  const [urlImagen, setUrlImagen] = useState("");
  // Estado para el file imagen
  const [imagen, setImagen] = useState(null);

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
        imagen: negocio.imagen,
      });

      cambiarStateCategorias(negocio.categorias);
      cambiarStateProductos(negocio.productos);
    }

    return () => {
      unSubscribe();
    };
  }, [user, negocio]);

  const handleDatos = (e) => {
    switch (e.target.name) {
      case "nombre":
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });

        break;
      case "ciudad":
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });
        break;
      case "direccion":
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });
        break;
      case "telefono":
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });

        break;

      case "producto":
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });

        break;

      case "categoria":
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  // Agregar Productos
  const agregarProductos = () => {
    let span = document.getElementById("span_producto");
    if (datos.producto.length === 0) {
      span.className = "text-dark text-center";
      span.innerText = "No se puede agregar un producto vacio.";
    } else {
      span.innerText = "";
      cambiarStateProductos([
        ...stateProductos,
        {
          id: uuidv4(),
          nombre: datos.producto,
        },
      ]);

      setDatos({
        ...datos,
        producto: "",
      });
    }
  };

  //Agregar Categorias
  const agregarCategorias = () => {
    let span = document.getElementById("span_categorias");
    if (datos.categoria.length === 0) {
      span.className = "text-dark";
      span.innerText = "No se puede agregar una categoria vacia";
    } else {
      span.innerText = "";
      cambiarStateCategorias([
        ...stateCategorias,
        {
          id: uuidv4(),
          nombre: datos.categoria,
        },
      ]);

      setDatos({
        ...datos,
        categoria: "",
      });
    }
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

  // Manejar la subida de la Imagen y Obtener la URL

  const handleImagen = async () => {
    try {
      if (validFileType(imagen)) {
        await SubirImagen(imagen, user.uid);
        swal("Correcto", "Haz cargado la imagen correctamente", "success");
        const { res } = await DescargarImagen(user.uid);
        setUrlImagen(res);
        setDatos({
          ...datos,
          imagen: urlImagen,
        });
      } else {
        swal("Error", "Solo se aceptan imagenes", "error");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //VALIDACION DE TELEFONO
  function validarTelefono(telefono) {
    let exp = new RegExp(/^\S[0-9]{8,10}$/);
    if (!exp.test(telefono)) {
      return false;
    } else {
      return true;
    }
  }

  // VALIDAR CAMPOS VACIOS
  function validarCampoVacio(campo) {
    if (campo.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete datos.categoria;
    delete datos.producto;

    try {
      setDatos({
        productos: stateProductos,
        categorias: stateCategorias,
        userId: user.uid,
        imagen: urlImagen !== "" ? urlImagen : negocio.imagen,
        ...datos,
      });

      if (!validarCampoVacio(datos.nombre)) {
        setMensaje("Por favor ingrese el nombre de su negocio.");
        return;
      }

      if (!validarTelefono(datos.telefono)) {
        setMensaje(
          "Por favor ingrese un número de telefono válido, mínimo 8 dígitos y máximo 10."
        );
        return;
      }

      if (!validarCampoVacio(datos.ciudad)) {
        setMensaje(
          "Por favor ingrese una ciudad, no se aceptan campos vacios."
        );
        return;
      }

      if (!validarCampoVacio(datos.direccion)) {
        setMensaje("Por favor ingrese una direccion.");
        return;
      }

      if (datos.imagen === "") {
        setDatos({
          ...datos,
          imagen: negocio.imagen,
        });
      }

      console.log(datos);

      if (
        validarCampoVacio(datos.nombre) &&
        validarTelefono(datos.telefono) &&
        validarCampoVacio(datos.ciudad) &&
        validarCampoVacio(datos.direccion)
      ) {
        if (!editanto) {
          setTimeout(async () => {
            await GuardarNegocio({
              nombre: datos.nombre.toUpperCase(),
              ciudad: datos.ciudad.toUpperCase(),
              telefono: Number(datos.telefono),
              direccion: datos.direccion.toUpperCase(),
              descripcion: datos.descripcion.toUpperCase(),
              productos: stateProductos,
              categorias: stateCategorias,
              userId: user.uid,
              imagen: urlImagen,
            });
          }, 200);
          swal("Completado", "Negocio Registrado", "success");
          setEditanto(!editanto);
        } else if (editanto) {
          if (!imagen) {
            let { res } = DescargarImagen(user.uid);
            console.log(res);
          } else {
            setDatos({
              nombre: datos.nombre.toUpperCase(),
              ciudad: datos.ciudad.toUpperCase(),
              telefono: Number(datos.telefono),
              direccion: datos.direccion.toUpperCase(),
              descripcion: datos.descripcion.toUpperCase(),
              productos: stateProductos,
              categorias: stateCategorias,
              userId: user.uid,
              imagen: negocio.imagen,
            });
          }

          if (
            actualizarNegocio(negocio.id, {
              nombre: datos.nombre.toUpperCase(),
              ciudad: datos.ciudad.toUpperCase(),
              telefono: Number(datos.telefono),
              direccion: datos.direccion.toUpperCase(),
              descripcion: datos.descripcion.toUpperCase(),
              productos: stateProductos,
              categorias: stateCategorias,
              userId: user.uid,
              imagen: urlImagen,
            })
          ) {
            swal("Modificación", "Actualizacion realizada", "success");
            console.log(datos);
            setEditanto(!editanto);
          }

          console.log(datos);
        }
      } else {
        swal(
          "Registro erroneo",
          "Por favor verifique que sus datos suministrados sean los esperados.",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Validacion de tipo de imagen en el Input
  const fileTypes = [
    "image/apng",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
    "image/x-icon",
  ];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  // Convertidor de tamaño de archivos
  function returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }
  // Selecciono el preview contenedor
  const preview = document.querySelector(".preview");
  //Manejador del input files
  const handleInputFile = async (e) => {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = e.target.files;
    console.log(curFiles);
    if (curFiles === 0) {
      const p = document.createElement("p");
      p.textContent = "No hay imagen seleccionada";
      preview.append(p);
    } else {
      const contenedor = document.createElement("div");
      contenedor.className = "figure";
      preview.appendChild(contenedor);

      for (const file of curFiles) {
        const p = document.createElement("p");

        if (validFileType(file)) {
          p.textContent = `File name ${file.name} , file size ${returnFileSize(
            file.size
          )}.`;
          setImagen(file);
          const image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.style.maxWidth = "18rem";
          image.style.maxHeight = "18rem";
          contenedor.append(image);
          preview.appendChild(p);
        } else if (!validFileType(file)) {
          p.className = "text-danger";
          p.textContent = `File name ${file.name}: Not a valid file type.`;
          contenedor.appendChild(p);
          return;
        } else if (!file) {
          setDatos({
            ...datos,
            imagen: urlImagen !== "" ? urlImagen : negocio.imagen,
          });
        }

        //list.appendChild(list);
      }
    }
  };
  return (
    <div className="container-fluid bg-light text-dark">
      <Titulo>
        {editanto && negocio ? "TU NEGOCIO" : "REGISTRA TU NEGOCIO"}
      </Titulo>
      <form>
        <p>{mensaje}</p>
        <div className="row p-4">
          <div
            className="col-sm-3 col-md-3 col-xl-4 col-lg-4 card text-white p-2 mb-2"
            style={{ backgroundColor: "#ccc" }}
          >
            <div className="card-header text-center">
              <h2 className="card-title">Contacto</h2>
            </div>

            <div className="card-body">
              <div className="form-group row">
                <label htmlFor="nombre" className="col-sm-4">
                  Nombre de mi negocio
                </label>
                <div className="col-sm-8">
                  <input
                    name="nombre"
                    type="text"
                    id="nombre"
                    className="form-control"
                    value={datos.nombre || ""}
                    onChange={(e) => handleDatos(e)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="ciudad" className="col-sm-4 ">
                  Ciudad
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    className="form-control"
                    autoComplete="on"
                    value={datos.ciudad || ""}
                    onChange={(e) => handleDatos(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="direccion" className="col-sm-4 ">
                  Dirección
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="direccion"
                    id="direccion"
                    autoComplete="on"
                    className="form-control"
                    value={datos.direccion || ""}
                    onChange={(e) => handleDatos(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="telefono" className="col-sm-4 ">
                  Contacto
                </label>
                <div className="col-sm-8">
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    autoComplete="on"
                    className="form-control"
                    value={datos.telefono || ""}
                    onChange={(e) => handleDatos(e)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3 col-md-3 col-lg-4 col-xl-4 card bg-info p-2 mb-2">
            <div className="card-header">
              {/* PRODUCTOS*/}
              <h2 className="card-title text-center text-white">Productos</h2>
            </div>
            <ContenedorProductos
              id="contenedorProductos"
              className="form-group row"
            >
              <div className="col-sm-9 mt-3 d-inline">
                <div className="text-center">
                  <span id="span_producto"></span>
                </div>
                <input
                  type="text"
                  name="producto"
                  value={datos.producto || ""}
                  autoComplete="on"
                  className="form-control ml-2"
                  onChange={(e) => handleDatos(e)}
                />
              </div>

              <div className="col-sm-3 mt-3 d-inline">
                <BsPlusCircleDotted
                  as="input"
                  type="button"
                  onClick={() => agregarProductos()}
                  color="#0c1ae9"
                  size="1.6rem"
                />
              </div>

              <ul className="list-group card-body">
                {stateProductos.length > 0 &&
                  stateProductos.map((product) => {
                    return (
                      <div className="form-group row mx-2" key={product.id}>
                        <div className="col-sm-10">
                          <li className="list-group-item rounded">
                            {product.nombre}
                          </li>
                        </div>
                        <div className="col-sm-2">
                          <BsXLg
                            as="input"
                            type="button"
                            onClick={() => eliminarProducto(product.id)}
                            color="#e41a24"
                            size="1rem"
                          />
                        </div>
                      </div>
                    );
                  })}
              </ul>
            </ContenedorProductos>
          </div>

          <div className="col-sm-3 col-md-3 col-lg-4 col-xl-4 card bg-warning p-2 mb-2">
            <div className="card-header">
              <h2 className="card-title text-center text-white">Categorias</h2>
            </div>
            <ContenedorProductos className="form-group row">
              <div className="col-sm-9 mt-3 d-inline">
                <div className="text-center">
                  <span id="span_categorias"></span>
                </div>
                <input
                  type="text"
                  name="categoria"
                  value={datos.categoria || ""}
                  autoComplete="on"
                  className="form-control ml-2"
                  onChange={(e) => handleDatos(e)}
                />
              </div>

              <div className="col-sm-3 mt-3 d-inline">
                <BsPlusCircleDotted
                  as="input"
                  type="button"
                  onClick={() => agregarCategorias()}
                  color="#0c1ae9"
                  size="1.6rem"
                  className="ml-1"
                />
              </div>

              <ul className="list-group card-body">
                {stateCategorias.length > 0 &&
                  stateCategorias.map((categoria) => {
                    return (
                      <div className="form-group row mx-2" key={categoria.id}>
                        <div className="col-sm-10">
                          <li className="list-group-item rounded">
                            {categoria.nombre}
                          </li>
                        </div>
                        <div className="col-sm-2">
                          <BsXLg
                            as="input"
                            type="button"
                            onClick={() => eliminarCategoria(categoria.id)}
                            color="#e41a24"
                            size="1rem"
                          />
                        </div>
                      </div>
                    );
                  })}
              </ul>
            </ContenedorProductos>
          </div>
          <div className="col-sm-7 col-md-7 col-lg-7 col-xl-7 p-2 mr-2 text-white">
            <input
              type="file"
              name="imagen"
              accept=".jpeg,.png,.svg"
              className="form-control"
              src={urlImagen || ""}
              onChange={handleInputFile}
            />
            <input
              type="button"
              value={datos.imagen ? "Actualizar Imagen" : "SubirImagen"}
              className="btn text-white mt-2 btn-warning"
              onClick={() => handleImagen()}
            />

            {datos.imagen && (
              <Card>
                <div>
                  <img
                    src={datos.imagen || DescargarImagen(user.uid)}
                    alt={datos.descripcion}
                    style={{ maxWidth: "18rem", maxHeight: "18rem" }}
                  />
                </div>
              </Card>
            )}

            <Card className="preview text-dark">
              <p>No hay archivo que se halla seleccionado aún.</p>
            </Card>
          </div>

          <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 p-2 ml-5">
            <div className="w-100">
              <button
                onClick={(e) => handleSubmit(e)}
                className="btn btn-block btn-primary"
              >
                <span>
                  <FiUploadCloud />
                </span>
                {editanto ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
/*const ContenedorSvg = styled.div`
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
`;*

/*const ContenedorFomulario = styled.div`
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
`;*/

const Card = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;

  & > div > img {
    cursor: pointer;
    border-radius: 50%;
  }

  @media (max-width: 960px) {
    & > div {
      > h3 {
        font-size: 1.1rem;
      }
      > p {
        font-size: 0.9rem;
      }
    }

    & > div > img {
      width: 7.6rem;
    }
  }

  @media (max-width: 768px) {
    & > div {
      > p {
        font-size: 1.2rem;
      }
    }

    & > div > img {
      width: 10rem;
    }
  }

  @media (max-width: 640px) {
    & > div {
      > p {
        font-size: 1rem;
      }
    }

    & > div > img {
      width: 8rem;
    }
  }

  @media (max-width: 400px) {
    & > div {
      > p,
      h3 {
        display: none;
      }
    }
  }

  @media (max-width: 280px) {
    & > div {
      display: none;
    }

    & > div > img {
      width: 6rem;
    }
  }
`;

const ContenedorProductos = styled.div`
  width: 100%;

  & > div > svg {
    cursor: pointer;
    margin-left: 0.5rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;

/*const Input = styled.input`
  font-size: 1.5rem; /* 40px
  text-transform: uppercase;
  text-align: center;
  border: none;
  border-bottom: 2px solid #1e92e0;
  outline: none;
  width: 77%;
  border-radius: 5px;

  @media (max-width: 60rem) {
    /* 950px 
    font-size: 1rem 24px
  }
`;*/

const Titulo = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 2.5rem; /* 40px */
  text-align: center;
  box-shadow: 6px 10px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => props.blanco && "#FFFF"};
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

const ElementoLista = styled.ul`
  text-transform: uppercase;
  @media (max-width: 60rem) {
    /* 950px */
    font-size: 1rem; /* 24px */
  }
`;
export default CrearNegocio;
