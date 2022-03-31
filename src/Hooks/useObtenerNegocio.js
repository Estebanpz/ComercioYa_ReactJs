import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import {useNavigate} from "react-router-dom";

const useObtenerNegocio = (id) =>{
    const [negocio, setNegocio] = useState('');
    const navigate = useNavigate();
    let docRef = doc(db, "comerciantes", id);
    const obtenerNegocio = onSnapshot(docRef, (doc) => {
        if(doc.exists){
            setNegocio(doc.data());
        }else{
            navigate('/');
        }
    });

    useEffect(() => {
        obtenerNegocio();

        return () => setNegocio('');
    }, [id]);

    return [negocio, obtenerNegocio, setNegocio];
}

 
export default useObtenerNegocio;