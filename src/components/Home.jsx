import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useObtenerNegocios from "../Hooks/useObtenerNegocios";
import Comerciantes from "./Comerciantes";

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
    <ContenedorCards>
        {
            !cargando && negocios.length >0 ?
            <Comerciantes comerciantes={negocios} />
            :
            <div>Cargando...</div>
        }
    </ContenedorCards>
  );
};
// Cards responsives
const ContenedorCards = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    // con fr son fracciones, entonces subdivide la pantalla en 3 partes o x fracciones
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    //Espacio entre todo - filas y columnas
    //gap: 1rem;
    
    //Espacio entre columnas
    //column-gap: 0.4rem;
    //row-gap: 0.3rem;
    outline: 4px solid magenta;

    @media (max-width: 1060px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 760px){
        grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 522px) {
      grid-template-rows: repeat(2, 1fr);
    }
`;
export default Home;
