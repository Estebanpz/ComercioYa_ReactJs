import styled from 'styled-components';
//styled components para un formulario
const Formulario = styled.form`
    padding: 0.4rem;
    background-color: #fff;
    margin-bottom: 2rem;
    text-align: center;
    align-items: center;
    
    //Medias Query
    @media (max-width: 490px) {
        flex-direction: column;
    }

    >a {
        color: #000;
        text-decoration: none;
        font-size: 1.4rem;
        margin-top: 1.40rem;
        display:block;
        &:hover {
            transition: all ease-in-out 0.6s;
            border-bottom: 2px solid #165168;
        }
        >svg{
            margin-left: .5rem;
            font-size:0.10rem;
            color: #000;
        }
    }
`;
//Input Básico
const Input = styled.input`
    width: 90%;
    padding: 0.3rem;
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
    font-size: 1.6rem;
    letter-spacing: 1px;
    &:focus{
        transition: ease-in .6s;
        border-bottom:2px solid #4CAF50; 
    }

    @media (max-width: 490px) {
        font-size:0.89rem;
    }

    @media (max-width: 300px) {
        font-size:0.7rem;
        width: auto;
    }

    @media (max-width: 250px) {
        font-size:0.6rem;
        width: 100%;
    }

    @media (max-width: 200px) {
        font-size:0.6rem;
        width: 100%;
    }
`;
const Boton = styled.button`
    width: 45%;
    height: 2.4rem;
    font-size: 1.2rem;
    padding: 0.3rem;
    line-height: 1.5;
    cursor: pointer;
    border-radius: 12px;
    outline-style: none;
    background-color: rgb(91, 105, 226);
    color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

    svg{
        margin-left: .9rem;
        font-size:20px;
        color: #fff;
    }

    &:hover{
        transition: ease-out .5s;
        background-color: #4CAF50;
    };

    @media (max-width: 490px){
        width: 45%;
        height: auto;
        flex-direction: column;
    }

    @media (max-width: 331px) {
        width: auto;
    }

    @media (max-width: 300px) {
        width: auto;
    }

    @media (max-width: 250px) {
        width: 100%;
        font-size: 0.6rem;
    }

    @media (max-width: 200px) {
        width: auto;
        font-size: 0.6rem;
    }
`;

export {
    Formulario,
    Input,
    Boton
}