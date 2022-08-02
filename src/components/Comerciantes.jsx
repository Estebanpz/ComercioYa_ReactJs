import React from "react";
import Tarjeta from "../elementos/Tarjeta";
const Comerciantes = ({ comerciantes }) => {
  return comerciantes.map((comerciante) => (
    <div key={comerciante.id} className="col-sm-6 col-md-6 col-xl-6 col.lg-6 mb-4">
      <Tarjeta comerciante={comerciante}/>
    </div>
  ));
};
export default Comerciantes;
