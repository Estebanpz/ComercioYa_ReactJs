import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useObtenerNegocios from "../Hooks/useObtenerNegocios";
import ListaComerciantes from "./ListaComerciantes";

import { ReactComponent as NoHayNegocio } from "./../img/no-hay-negocios.svg";
import { Contenedor } from "./../elementos/ElementosFormulario";
const Home = () => {
  const [cargando, setCargando] = useState(true);
  const [negocios, setNegocios] = useObtenerNegocios();

  // API RICK AND MORTY , Probando estilos de posibles tarjetas
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const backPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    setCargando(true);
    async function fetchData() {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );

      const { results } = await data.json();
      setData(results);
      setCargando(false);
    }

    fetchData();
    return () => {
      setData([]);
    };
  }, [page]);

  if (cargando === true) {
    return (
      <Contenedor>
        <Loader>
          <Circle />
          <Circle />
          <Circle />
        </Loader>
      </Contenedor>
    );
  }

  if (data.length === 0) {
    <>
      <ContenedorSvg>
        <Titulo>
          <h1>No hay negocios registrados</h1>
        </Titulo>
        <NoHayNegocio />
      </ContenedorSvg>
    </>;
  }

  if (!cargando && data.length > 0) {
    return (
      <>
        <ContenedorBtns>
          <Btn type="button" onClick={() => nextPage()}>
            Siguiente
          </Btn>
          <Btn type="button" Rojo onClick={() => backPage()}>
            Atrás
          </Btn>
          pagina:{page}
        </ContenedorBtns>
        <ListaComerciantes personajes={data} />
      </>
    );
  }

  return <p> No hay personajes</p>;
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
  margin-top: 2rem;
  padding: 0;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
`;

const ContenedorBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
`;

const Btn = styled.button`
  width: 6.6rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${(props) => (props.Rojo ? "red" : "blue")};
  color: #fff;
  border-radius: 0.5rem;
`;
export default Home;
