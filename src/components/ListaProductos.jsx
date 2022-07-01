import React, { Fragment } from "react";
// Importando toast & Toaster
import toast, { Toaster } from "react-hot-toast";
// Importando Íconos
import { BsTrash2 } from "react-icons/bs";
const ListaProductos = ({
  productos,
  setProductos,
  categorias,
  setCategorias,
}) => {
  if ((productos)) {
    return productos.map((producto, index) => (
      <Fragment key={index}>
        <li className="list-group-item d-inline" >
          <span className="mx-1">
            <BsTrash2
              className="text-danger"
              fontSize="1.2rem"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const nuevosProductos = [...productos];
                nuevosProductos.splice(index, 1);
                productos = nuevosProductos;
                toast.error("Producto eliminado");
              }}
            />
          </span>
          {producto}
        </li>
        <Toaster />
      </Fragment>
    ));
  }

  if (categorias) {
    return categorias.map((categoria, index) => (
      <Fragment key={index}>
        <li className="list-group-item d-inline">
          <span className="mx-1">
            <BsTrash2
              className="text-danger"
              fontSize="1.2rem"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const nuevasCategorias = [...categorias];
                nuevasCategorias.splice(index, 1);
                categorias = nuevasCategorias;
                toast.error("Categoria eliminado");
              }}
            />
          </span>
          {categoria}
        </li>
        <Toaster />
      </Fragment>
    ));
  }
};

export default ListaProductos;
