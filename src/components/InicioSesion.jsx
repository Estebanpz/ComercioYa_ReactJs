import React from 'react';
import styled from 'styled-components';
import { Formulario, Input, Boton } from '../elementos/ElementosFormulario';
import {ReactComponent as IconoLogin} from '../img/login.svg';
const InicioSesion = () => {
    return ( 
        <>
            <ContenedorTitulo>
                <Titulo>
                    Iniciar Sesión
                    <IconoLogin />
                </Titulo>
            </ContenedorTitulo>

            <Formulario>
                <Input type="email" placeholder="CORREO@CORREO.COM" />
                <Input type="password" placeholder="CONTRASEÑA" />
                <Boton>
                    INICIAR SESIÓN
                </Boton>
            </Formulario>
        </>
     );
}


const ContenedorTitulo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 2rem;
`;

const Titulo = styled.h2`
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    margin-bottom: 2rem;
    letter-spacing: 1px;

     svg{
        margin-left: 1rem;
        margin-top: 1rem;
        width: 2.5rem;
        height: 2.5rem;
    }

    @media (max-width: 340px) {
       word-break: break-all;
    }
`;
export default InicioSesion;