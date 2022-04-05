import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useObtenerNegocios from "../Hooks/useObtenerNegocios";
const Home = () => {
  const [cargando, setCargando] = useState(true);
  const [negocios, setNegocios] = useObtenerNegocios();

  useEffect(() => {
    if (negocios) {
      setCargando(false);
    }
    return () => {
      setNegocios([]);
    };
  }, []);
  return (
    <>
      <h1>Comerciantes</h1>
        {
            !cargando && negocios.length >0 ? negocios.map((negocio)=>{
                return(
                    <div key={negocio.id}>
                        <TituloNegocio>{negocio.Nombre}</TituloNegocio>
                    </div>
                )
            })
            :
            <div>Cargando...</div>
        }
    </>
  );
};

const TituloNegocio = styled.h3`
  color: #000;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
`;
export default Home;
