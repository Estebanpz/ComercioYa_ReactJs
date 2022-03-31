import React from 'react';
import {useAuth} from "./../Context/AuthContext";
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({children})=>{
const {user} = useAuth();

    if(user){
        return children;
    }else{
        return <Navigate to="/inicio-sesion"/>;
    }
}
export default RutaPrivada;