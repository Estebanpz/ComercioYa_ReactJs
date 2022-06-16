import React from "react";
const Comerciantes = ({ comerciantes }) => {
  return comerciantes.map((comerciante) => (
    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 mb-1" key={comerciante.id}>
      <div
        className="card mb-3 mt-3 justify-content-center aling-items-center m-0 p-0"
        style={{ height: "90%", width: "100%" }}
      >
        <div className="card-header">
          <h3 className="card-title text-truncate bd-highlight">{comerciante.Nombre}</h3>
        </div>
        <div className="card-body">
          <img
            src={comerciante.Imagen}
            alt={comerciante.Nombre}
            style={{ height: "60%", width: "100%" }}
          />
        </div>
        <div className="card-footer">
          <p className="card-text">{comerciante.Descripcion}</p>
          <p className="card-text">Contacto: {comerciante.Telefono}</p>
        </div>
      </div>

    </div>
  ));
};
export default Comerciantes;
