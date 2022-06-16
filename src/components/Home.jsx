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
    <>
      {!cargando && negocios.length > 0 ? (
        <div className="container-fluid">
          <div className="row">
            <Comerciantes comerciantes={negocios} />
          </div>
        </div>
      ) : (
        <div className="justify-content-center aling-items-center my-4">
            <Loader>
              <Circle/>
              <Circle/>
              <Circle/>
            </Loader>
        </div>
      )}
    </>
  );
};

const Loader = styled.div `
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display:flex;
`;

const Circle = styled.div `
  background: deepskyblue;
  width:20px;
  height:20px;
  margin:0 4px;
  border-radius:50%;
  animation: animate 2s infinite linear;

  >:nth-child(1){
    animation-delay: 0.5s;
  }

  >:nth-child(2){
    animation-delay: 1s;
  }

  >:nth-child(3){
    animation-delay: 1.5s;
  }

  @keyframes animate {
    0%,
    100% {
      opacity:0;
    }

    50%{
      opacity:1;
    }
  }
`;
export default Home;
