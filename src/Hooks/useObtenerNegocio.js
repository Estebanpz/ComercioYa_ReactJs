import { db } from "../Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";


const useObtenerNegocio = (id) => {
  const [negocio, cambiarNegocio] = useState([]);
  
  const obtenerNegocio = async () => {
    const docRef = doc(db, "Comerciantes", id);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        cambiarNegocio(docSnap.data());
    }
  };
  useEffect(() => {
    obtenerNegocio();

    return () => {
      cambiarNegocio('');
    };
  }, [id]);

  return [negocio, cambiarNegocio];
};
export default useObtenerNegocio;
