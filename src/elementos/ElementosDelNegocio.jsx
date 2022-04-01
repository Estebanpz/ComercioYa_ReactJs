import styled from "styled-components";
const ContenedorNegocio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 1rem;
`;
const Titulo = styled.h2`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    transition: all ease-in-out 0.4s;
    border-bottom: 2px solid #165168;
  }
`;

const SubTitulo = styled.h4`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #747575;
  cursor: pointer;
  &:hover {
    transition: all ease-in-out 0.4s;
    border-bottom: 2px solid #0f0f0f;
  }
`;

const ContenedorProductos = styled.select`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  margin-top: 0.6rem;
  cursor: pointer;
  padding: 7px 10px;
  outline: 0;
  border: 0;
  background: #f0f0f0;
  color: #7b7b7b;
  font-size: 1em;
  color: #999;
  font-family: "Quicksand", sans-serif;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  transition: all 0.25s ease;

  &:hover {
    background: #b1e8cd;
    color: #333;
  }
`;

const Producto = styled.option`
  text-align: center;
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

const Telefono = styled.h4`
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #60a4e4;
  cursor: pointer;
  &:hover {
    transition: all ease-in-out 0.4s;
    border-bottom: 2px solid #6d6d6d;
  }
`;

export {
  ContenedorNegocio,
  ContenedorProductos,
  Titulo,
  Producto,
  SubTitulo,
  Imagen,
  Telefono,
};
