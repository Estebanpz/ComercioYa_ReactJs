import React, { useState } from "react";
// Importanto el toast & Toaster
import toast, { Toaster } from "react-hot-toast";
// Importando componente que lista los productos
import ListaProductos from "./ListaProductos";
// Importando función para Guardar Negocio
import { GuardarNegocio } from "../Firebase/GuardarNegocio";
// Importando el UseAuth para poder obtener el usuario actual
import { useAuth } from "../Context/AuthContext";
const CrearNegocio = () => {
  // Obteniendo el usuario actual
  const {user}= useAuth();
  //Estado para los productos y categorias
  const initialState = {
    producto: "",
    categoria: "",
    nombre:"",
    descripcion:"",
    telefono: "",
    direccion: "",
    categorias: [],
    productos:[],
    forma_de_pago:"Efectivo",
  };
  const [errorProducto, setErrorProducto] = useState(true);
  const [errorCategoria, setErrorCategoria] = useState(true);
  //Estado para los datos del negocio
  const [datos, setDatos] = useState({
    producto: "",
    categoria: "",
    nombre:"",
    descripcion: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    productos : [],
    categorias: [],
    forma_de_pago: "Efectivo",
  });

  const handleDatos = (e) => {
    //Nombre del Negocio
    if (e.target.name === "nombre") {
      const { value } = e.target;
      setDatos({
        ...datos,
        nombre: value,
      });
     
    };
    //Descripción del Negocio

    if (e.target.name === "descripcion") {
      const { value } = e.target;
      setDatos({
        ...datos,
        descripcion: value,
      });
    };

    // Formas de Pago
    if (e.target.name === "formas-pagos") {
      const { value } = e.target;
      setDatos({
        ...datos,
        forma_de_pago: value,
      });
    };

    // Ciudad del Negocio
    if (e.target.name === "ciudad") {
      const { value } = e.target;
      setDatos({
        ...datos,
        ciudad: value,
      });
    };

    // Dirección del Negocio
    if (e.target.name === "direccion") {
      const { value } = e.target;
      setDatos({
        ...datos,
        direccion: value,
      });
    };

    // Teléfono del Negocio

    if (e.target.name === "telefono") {
      const { value } = e.target;
      setDatos({
        ...datos,
        telefono: value,
      });
    };

    // Producto
    if (e.target.name === "producto") {
      const { value } = e.target;
      setDatos({
        ...datos,
        producto: value,
      });

       if(value !== '' || value!== undefined) {
          setErrorProducto(!errorProducto)
          
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

  const handleProductos = (e) => {
    if (!errorProducto) {
      
      setDatos({
        ...datos,
        productos:[...datos.productos, datos.producto],
      });
      toast.success("Producto agregado");
    } else {
      toast.error("No deje el campo vacio");
    }
  };

  const handleCategorias = (e) => {
    if (!errorCategoria) {
      setDatos({
        ...datos,
        categorias:[...datos.categorias, datos.categoria],
      });
      toast.success("Categoria agregada");
    } else {
      toast.error("No deje el campo vacio");
    }
  };

  // Manejador del evento Submit del Formulario
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      delete datos.producto;
      delete datos.categoria;
      datos.Userid = user.uid
      
      await GuardarNegocio(datos);
      toast.success("Negocio Guardado");
        console.log(user.uid);
      setDatos(initialState);
    }catch(error){
      console.log(error);
      toast.error("Error al guardar");
    }
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 m-0 p-0">
            <div className="card m-2">
              <div className="card-header">
                <h2 className="card-title">
                  <strong>Datos del Negocio</strong>
                </h2>
              </div>
              <div className="card-body">
                <div className="form-group my-4">
                  <label htmlFor="nombre" className="card-text">
                    Nombre del Negocio
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={datos.nombre}
                    onChange={(e)=>handleDatos(e)}
                    className="form-control form-control-md"
                    placeholder="Nombre del Negocio"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion" className="card-text">
                    Descripcion del Negocio
                  </label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    value={datos.descripcion}
                    onChange={(e)=>handleDatos(e)}
                    className="form-control form-control-md"
                    rows="3"
                    placeholder="Descripcion del Negocio"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="formas-pago">Formas de Pago</label>
                  <select
                    className="form-control"
                    name="formas-pagos"
                    id="formas-pago"
                    value={datos.forma_de_pago}
                    onChange={(e)=>handleDatos(e)}
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="nequi">Nequi</option>
                    <option value="daviplata">Daviplata</option>
                    <option value="otro-pago">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="producto">Productos ó Servicios</label>
                  <input
                    type="text"
                    name="producto"
                    id="producto"
                    className="form-control form-control-md"
                    placeholder="Productos ó Servicios"
                    value={datos.producto}
                    onChange={(e) => handleDatos(e)}
                    autoComplete="on"
                  />
                  <div className="my-1 justify-content-center aling-items-center">
                    <input
                      type="button"
                      value="Agregar"
                      className="btn btn-primary"
                      onClick={() => handleProductos()}
                    />
                  </div>
                </div>
              </div>
              {datos.productos && (
                <div className="card-footer">
                  <ul className="list-group">
                    <ListaProductos
                      productos={datos.productos}
                    />
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 m-0 p-0">
            <div className="card m-2">
              <div className="card-header">
                <h2 className="card-title">
                  <strong>Ubucación del Negocio</strong>
                </h2>
              </div>
              <div className="card-body my-4">
                <div className="form-group">
                  <label htmlFor="ciudad">Cuidad:</label>
                  <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={datos.ciudad}
                    onChange={(e)=>handleDatos(e)}
                    className="form-control form-control-md"
                    placeholder="Ciudad"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="direccion">Dirección:</label>
                  <input
                    type="text"
                    name="direccion"
                    id="direccion"
                    value={datos.direccion}
                    onChange={(e)=>handleDatos(e)}
                    className="form-control form-control-md"
                    placeholder="Dirección"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={datos.telefono}
                    onChange={(e)=>handleDatos(e)}
                    className="form-control form-control-md"
                    placeholder="Teléfono"
                  />
                </div>

                <div className="form-group mt-5">
                  <label htmlFor="categoria" className="mb-2">Categorias:</label>
                  <input
                    type="text"
                    name="categoria"
                    id="categoria"
                    className="form-control form-control-md"
                    value={datos.categoria}
                    autoComplete="on"
                    onChange={(e) => handleDatos(e)}
                  />
                  <div className="my-1 justify-content-center aling-items-center">
                    <input
                      type="button"
                      value="Agregar"
                      className="btn btn-primary"
                      onClick={() => handleCategorias()}
                    />
                  </div>
                </div>
              </div>
              {datos.categorias && (
                <div className="card-footer">
                  <ul className="list-group">
                    <ListaProductos
                      categorias={datos.categorias}
                    />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <button className="btn btn-success my-2">
              Guardar Datos
            </button>
        </div>
      </div>
      </form>
      <Toaster />
    </div>
  );
};

export default CrearNegocio;
