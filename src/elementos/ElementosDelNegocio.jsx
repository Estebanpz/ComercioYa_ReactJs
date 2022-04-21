import styled from "styled-components";

const ContenedorNegocio = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;
  margin-top: 14px;
`;

const Formulario = styled.form`
  padding: 0.4rem;
  background-color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  //Medias Query
  @media (max-width: 490px) {
    flex-direction: column;
  }
`;

const ContenedorProductos = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;
  margin-top: 14px;
`;

const ContenedorInformacion = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;
  margin-top: 14px;
  > h2{
    margin-top: 30px;
    margin-bottom: 10px;
  }
  
  > p{
    margin: 40px 0px;
  }
`;
const Titulo = styled.h2`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    transition: all ease-in-out 0.4s;
  }
`;

const ListaProductos = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: all ease-in-out 0.4s;
    cursor: pointer;
    text-transform: uppercase;
    &:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      transition: all ease-in-out 0.4s;
    }
  }
`;

const Imagen = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    transition: all ease-in-out 0.6s;
    box-shadow: 0 0 0.5rem 0.5rem #d6d2d2;
  }
`;

export {
  Titulo,
  Imagen,
  ContenedorNegocio,
  ContenedorProductos,
  Formulario,
  ContenedorInformacion,
  ListaProductos
};
