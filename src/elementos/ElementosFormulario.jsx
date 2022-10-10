import styled from "styled-components";
//styled components para un formulario
const Contenedor = styled.div`
  width: 100%;
  height: ${props => props.full ? '100%' : '100vh'};
  display: grid;
  background-color:${props => props.formulario ? '#E5E5E5': '#000000'};
  padding: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${props => props.blanco && '#000'};
`;

const ContenedorFormulario = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  > form {
    display: ${props => props.formulario && 'grid'};
    grid-template-columns: ${props => props.formulario && 'repeat(3, 1fr)'};
    gap: .3em;
    margin-top: 1.2rem;
    justify-content: center;
    align-items: center;
    color: ${props => props.blanco && '#FFFF'};
    &> div{
      height: 100%;
    }
  }
`;

const ContenedorInputs = styled.div`
  width: 100%;
  height: auto;
  margin:0;
  justify-content: center;
  align-items: center;
  background-color: none;
   &>label{
    color: ${props => props.blanco && '#FFFF'};
   }
`;
const Input = styled.input`
  width: 25rem;
  height: auto;
  display: block;
  border: none;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 0.1rem;
  color: #fca311;
  margin: 1rem;
  padding: 0.4rem;
  &::placeholder {
    color: rgba(rgb(255, 255, 255));
  }

  &:hover {
    transition: all ease-in-out 0.5s;
    border-bottom: 2px solid #fba410;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }
`;

const ContenedorBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Btn = styled.button`
  width: auto;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: #fca311;
  color: #fff;
  border-radius: 0.5rem;
  font-size:1rem;
`;

const ContenedorSvg = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  & > svg {
    width: 40%;
    height: auto;
    padding: 0;
    margin: 0;
  }
`;

export {
  Contenedor,
  ContenedorSvg,
  ContenedorFormulario,
  ContenedorInputs,
  ContenedorBtns,
  Btn,
  Input
};
