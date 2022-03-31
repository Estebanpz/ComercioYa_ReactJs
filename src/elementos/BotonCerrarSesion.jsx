import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { auth, signOut } from '../Firebase/firebaseConfig';
import toast,{Toaster} from "react-hot-toast";
//Icono de salir
import { BsBoxArrowRight } from "react-icons/bs";

const BotonCerrarSesion = () => {
    let navigate = useNavigate();

    const cerrarSesion = async() =>{
        try {
            await signOut(auth);
            toast.success("Sesión cerrada correctamente", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "1.5rem",
                  },
            });
            navigate("/inicio-sesion");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Boton as="button"  onClick={() => cerrarSesion()}>
                Salir
                <BsBoxArrowRight />
            </Boton>
            <Toaster/>
        </>
     );

}
const Boton = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    align-items: center;
    color: #165168;
    cursor: pointer;
    margin: 0px 10px;
    border: none;
    outline:none;
    background: transparent;
    font-size: 1rem;
    > svg {
      font-size: 30px;
      margin-left: 10px;
    }

    @media (max-width: 300px) {
        font-size:1rem;
        line-height:25px;
        svg{
            font-size: 20px;
            margin-left: 5px;
        }
    }
`;
export default BotonCerrarSesion;