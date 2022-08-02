import styled from "styled-components";
import { ReactComponent as Imagen1 } from "./../img/login.svg";
const Tarjeta = ({ comerciante }) => {
    
  return (
    <ContenedorTarjeta>
      <p>{comerciante.nombre}</p>
      <p>{comerciante.direccion}</p>
      <p>{comerciante.telefono}</p>
      <p>{comerciante.ciudad}</p>
      <div>
        <Imagen1 src={Imagen1} alt={comerciante.nombre} />
      </div>
    </ContenedorTarjeta>
  );
};

const ContenedorTarjeta = styled.div`
  width: 100%;
  height: auto;
  padding: 7px;
  display: grid;
  justify-content: center;
  align-items: center;
  //background-color: violet;
  border-radius: 0.2rem;
  box-sizing: border-box;
  box-shadow: 6px 5px 0.2rem rgba(30, 55, 255, 0.3);
  > p {
    text-align: center;
    text-transform: uppercase;
    text-decoration: dashed;
  }

  > div {
    display:flex;
    justify-content:center;
    align-items:center;
    > svg {
      justify-content: center;
      align-items: center;
      max-width: 12rem;
      width: 9rem;
      height: auto;
      position: relative;
    }
  }

  @media (max-width: 991px) {
    width: 90%;
    height: 100%;
    > p {
      font-size: 1rem;
    }

    > svg {
      margin: 0;
    }
  }

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    > p {
      font-size: 0.98rem;
    }

    > svg {
      margin: 0;
    }
  }
`;

export default Tarjeta;
