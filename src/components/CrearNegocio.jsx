import React, { useState } from "react";
// Importanto el toast & Toaster
import toast, { Toaster } from "react-hot-toast";
// Importando componente que lista los productos
import ListaProductos from "./ListaProductos";
const CrearNegocio = () => {
  //Estado para los productos y categorias
  const initialState = {
    producto: "",
    categoria: "",
  };
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorProducto, setErrorProducto] = useState(true);
  const [errorCategoria, setErrorCategoria] = useState(true);
  //Estado para los datos del negocio
  const [datos, setDatos] = useState({
    producto: "",
    categoria: "",
  });

  const handleDatos = (e) => {
    if (e.target.name === "producto") {
      const { value } = e.target;
      setDatos({
        ...datos,
        producto: value,
      });

      value.length >= 0
        ? setErrorProducto(!errorProducto)
        : setErrorProducto(false);
    }

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
      setProductos([...productos, datos.producto]);
      toast.success("Producto agregado");
    } else {
      toast.error("No deje el campo vacio");
    }
    setDatos(initialState);
  };

  const handleCategorias = (e) => {
    if (!errorCategoria) {
      setCategorias([...categorias, datos.categoria]);
      toast.success("Categoria agregada");
    } else {
      toast.error("No deje el campo vacio");
    }

    setDatos(initialState);
  };
  return (
    <div className="container">
      <form>
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
                    onChange={(e) => handleDatos(e)}
                    autoComplete="on"
                    value={datos.producto}
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
              {productos.length > 0 && (
                <div className="card-footer">
                  <ul className="list-group">
                    <ListaProductos
                      productos={productos}
                      setProductos={setProductos}
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
                    className="form-control form-control-md"
                    placeholder="Dirección"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    name=""
                    id="telefono"
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
              {categorias.length > 0 && (
                <div className="card-footer">
                  <ul className="list-group">
                    <ListaProductos
                      categorias={categorias}
                      setCategorias={setCategorias}
                    />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default CrearNegocio;
