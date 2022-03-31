import React, {useEffect} from 'react';
import { useAuth } from './../Context/AuthContext';
import {useParams} from "react-router-dom";
import useObtenerNegocio from '../Hooks/useObtenerNegocio';
const Negocio = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [negocio, obtenerNegocio] = useObtenerNegocio(id);
    useEffect(()=>{
        obtenerNegocio(id);
        console.log(negocio);
    },[user, id, obtenerNegocio]);
    return (
        <>
            <h1>Negocio de: {user.displayName}</h1>
        </>
     );
}
 
export default Negocio;