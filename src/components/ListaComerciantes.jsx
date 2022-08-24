import styled from "styled-components";
import Comerciante from "./Comerciante";
const ListaComerciantes = ({ personajes }) => {
  return (
    <Lista>
      {personajes.map((personaje) => (
        <Comerciante key={personaje.id} personaje={personaje}></Comerciante>
      ))}
    </Lista>
  );
};

const Lista = styled.section`
  width: 100%;
  height: 100%;
  margin: 0.01rem;
  padding: 0.4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2em;
  background-color: #000;
  color: #fff;

 
  @media (max-width: 1115px) {
    grid-template-columns: repeat(3, 1fr);
    gap: .8em;
  }


  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: .6em;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: .4em;
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: .2em;
  }

  
  @media (max-width:400px) {
    grid-template-columns:repeat(2, 1fr);
    
  }

  @media (max-width:360px) {
    grid-template-columns: repeat(2, 1fr)
  }
`;

export default ListaComerciantes;
