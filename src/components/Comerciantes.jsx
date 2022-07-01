import React from "react";
const Comerciantes = ({ comerciantes }) => {
  return comerciantes.map((comerciante) => (
    <div
      className="col-sm-3 col-md-3 col-lg-3 col-xl-3 mb-1 m-2 text-center"
      key={comerciante.id}
    >
      <div
        className="card"
        style={{ height: "auto", width: "50%" }}
      >
        <h3 className="card-title text-truncate bd-highlight">
          {comerciante.nombre}
        </h3>
        <div>
          <img
            src={comerciante.imagen}
            alt={comerciante.descripcion}
            className="rounded img-fluid"
          />
        </div>
        <p className="card-text">{comerciante.descripcion}</p>
        <p className="card-text">Contacto: {comerciante.telefono}</p>
      </div>
    </div>
  ));
};
export default Comerciantes;
