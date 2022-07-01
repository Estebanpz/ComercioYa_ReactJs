import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useObtenerNegocios from "../Hooks/useObtenerNegocios";
import Comerciantes from "./Comerciantes";
import { ReactComponent as NoHayNegocio } from "./../img/no-hay-negocios.svg";
const Home = () => {
  const [cargando, setCargando] = useState(true);
  const [negocios, setNegocios] = useObtenerNegocios();

  useEffect(() => {
    if (negocios) {
      setCargando(false);
      console.log(negocios);
    }

    return () => {
      setNegocios([]);
    };
  }, []);

  return (
    <>
      {cargando ? (
        <>
          <div className="justify-content-center aling-items-center my-4">
            <Loader>
              <Circle />
              <Circle />
              <Circle />
            </Loader>
          </div>
        </>
      ) : negocios.length === 0 ? (
        <ContenedorSvg>
          <Titulo>
            <h1>No hay negocios registrados</h1>
          </Titulo>
          <NoHayNegocio />
        </ContenedorSvg>
      ) : !cargando && negocios.length > 0 ? (
        <>
          <div className="row">
            <Comerciantes comerciantes={negocios} />
          </div>
        </>
      ) : (
        <h1>Aún no hay negocios en el Comercio Ya </h1>
      )}
    </>
  );
};

const Loader = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
`;

const Circle = styled.div`
  background: deepskyblue;
  width: 20px;
  height: 20px;
  margin: 0 4px;
  border-radius: 50%;
  animation: animate 2s infinite linear;

  > :nth-child(1) {
    animation-delay: 0.5s;
  }

  > :nth-child(2) {
    animation-delay: 1s;
  }

  > :nth-child(3) {
    animation-delay: 1.5s;
  }

  @keyframes animate {
    0%,
    100% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }
  }
`;

const ContenedorSvg = styled.div`
  width: 90%;
  height: auto;
  justify-content: center;
  margin-top: 2rem;

  & > div {
    text-align: center;
    padding: 0;
    margin: 0;
  }

  & > svg {
    width: 90%;
    height: auto;
    padding: 0;
    margin: 0;
  }
`;

const Titulo = styled.div`
  margin-top:2rem;
  padding:0;
  box-shadow: 0px 1.25rem 2.5rem rgba(0,0,0,.05);
`;
export default Home;
