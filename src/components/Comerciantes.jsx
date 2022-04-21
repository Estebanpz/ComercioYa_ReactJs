import React from "react";
import styled from "styled-components";
const Comerciantes = ({ comerciantes }) => {
  return comerciantes.map((comerciante) => (
    <Card key={comerciante.id}>
        <ContenedorTexto>
          <h1>{comerciante.Nombre}</h1>
          <p>{comerciante.Descripcion}</p>
        </ContenedorTexto>
      <ContenedorImagenes>
        {<img src={comerciante.Imagen} alt="" />}
      </ContenedorImagenes>  
    </Card>
  ));
};

//Card
const Card = styled.div`
  width: 80%;
  height:80%;
  margin-left: 40px;
  margin-top: 10px;
  outline: 1px solid black;
  display:grid;
  grid-template-rows: repeat(2,1fr);
`;

const ContenedorTexto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //outline: 2px solid navy;
  > h1{
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: capitalize;
  }
  > p{
    font-size: 1.1rem;
    font-weight: 300;
    text-transform: capitalize;
  }
`;

const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    height: 50%;
   
  }
`;
export default Comerciantes;
