import React from 'react';
import styled from 'styled-components';
const CrearCuenta = () => {
    return ( 
        <Formulario>
            <Input type="text" placeholder="NOMBRE" />
            <Input type="text" placeholder="APELLIDO" />
            <Input type="email" placeholder="CORREO@CORREO.COM" />
            <Input type="password" placeholder="CONTRASEÑA" />
            <Input type="password" placeholder="CONFIRMAR CONTRASEÑA" />
            <Boton>
                CREAR CUENTA
                
            </Boton>
        </Formulario>
     );
}
 

//styled components para un formulario
const Formulario = styled.form`
    padding: 0.4rem;
    background-color: #fff;
    margin-bottom: 2rem;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    //Medias Query
    @media (max-width: 490px) {
        flex-direction: column;
    }
`;

//Input para el nombre
const Input = styled.input`
    width: 65%;
    padding: 0.3rem;
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
    font-size: 1.2rem;

    &:focus{
        transition: ease .6s;
        border-bottom:2px solid #4CAF50; 
        animation: shake 0.5s;
    }

    @media (max-width: 490px) {
        font-size:0.89rem;
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
        svg{
            
        }
    }
`;
export default CrearCuenta;