import React, { useState } from "react";
import styled from "styled-components";
const CheckBoxCategoria = ({ setcategorias }) => {
  // Estado para validar las categorias seleccionadas
  const [checkCategorias, setCheckCategorias] = useState({
    comida: false,
    ropa: false,
    transporte: false,
    belleza: false,
  });

  const handleCategorias = (e) => {
    const id = e.target.id;

    switch (id) {
      case "comida":
        setCheckCategorias({
          ...checkCategorias,
          comida: !checkCategorias.comida,
        });

        break;
      case "ropa":
        setCheckCategorias({
          ...checkCategorias,
          ropa: !checkCategorias.ropa,
        });
        break;
      case "transporte":
        setCheckCategorias({
          ...checkCategorias,
          transporte: !checkCategorias.transporte,
        });

        break;
      case "belleza":
        setCheckCategorias({
          ...checkCategorias,
          belleza: !checkCategorias.belleza,
        });

        break;
      default:
        break;
    }
  };

  const saveCategorias = () => {
    let arrayCategorias = [];

    if (checkCategorias.comida) {
      arrayCategorias.push("comida");
    }

    if (checkCategorias.ropa) {
      arrayCategorias.push("ropa");
    }

    if (checkCategorias.transporte) {
      arrayCategorias.push("transporte");
    }

    if (checkCategorias.belleza) {
      arrayCategorias.push("belleza");
    }

    setcategorias(arrayCategorias);
  };
  return (
    <>
      <CheckBoxCategoriaContainer>
        <div>
          <CheckBoxCategoriaInput
            type="checkbox"
            id="comida"
            name="comida"
            defaultChecked={checkCategorias.comida}
            onChange={(e) => handleCategorias(e)}
          />
          <label htmlFor="comida">Comida</label>
        </div>
        <div>
          <CheckBoxCategoriaInput
            type="checkbox"
            id="ropa"
            name="ropa"
            defaultChecked={checkCategorias.ropa}
            onChange={(e) => handleCategorias(e)}
          />
          <label htmlFor="ropa">Ropa</label>
        </div>
        <div>
          <CheckBoxCategoriaInput
            type="checkbox"
            id="transporte"
            name="transporte"
            defaultChecked={checkCategorias.transporte}
            onChange={(e) => handleCategorias(e)}
          />
          <label htmlFor="transporte">Transporte</label>
        </div>
        <div>
          <CheckBoxCategoriaInput
            type="checkbox"
            id="belleza"
            name="belleza"
            defaultChecked={checkCategorias.belleza}
            onChange={(e) => handleCategorias(e)}
          />
          <label htmlFor="belleza">Belleza</label>
        </div>
      </CheckBoxCategoriaContainer>
        <ContenedorAgregarCategoria>
          <AgregarCategoria onClick={() => saveCategorias()}>
            Guardar categorias
          </AgregarCategoria>
        </ContenedorAgregarCategoria>
    </>
  );
};
const CheckBoxCategoriaContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0px;
  margin-top: 14px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 0;
  margin: 0;

  & label {
    cursor: pointer;
  }

  & div {
    width: auto;
    height: auto;
    margin: 0.1rem;
  }

  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    transition: all ease-in-out 0.4s;
    border-radius: 8px;
  }
`;

const CheckBoxCategoriaInput = styled.input`
  width: auto;
  margin-right: 0.2rem;
  text-transform: capitalize;
  cursor: pointer;
`;

const ContenedorAgregarCategoria = styled.div`
    width: 100%;
    height: auto;
    margin: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const AgregarCategoria = styled.div`
  width: 70%;
  height: auto;
  margin: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  background-color: rgb(91, 105, 226);
  color: white;
  border-radius: 8px;
`;
export default CheckBoxCategoria;
