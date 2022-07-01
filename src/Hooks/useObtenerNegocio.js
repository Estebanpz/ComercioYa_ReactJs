import { db } from "../Firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const useObtenerNegocio = (id) => {
  const [negocio, cambiarNegocio] = useState([]);


  useEffect(() => {

    async function main() {
      await obtenerNegocio();
    }

    main()
    return () => {
      cambiarNegocio('');
    };
  }, [id]);


  const obtenerNegocio = async () => {
    const referencia = collection(db, "Comerciantes");
    let consulta = query(referencia, where('Userid', '==', id));
    let resultado = await getDocs(consulta);
    let arrayAux = []

    resultado.forEach((doc) => {
      if (doc.exists()) {
        arrayAux.push(doc.data())
      } else {
        console.log('No existe negocio para este usuario');
      }

    });

    console.log(arrayAux);
    cambiarNegocio(arrayAux);
  }

  return [negocio, cambiarNegocio];

};


export default useObtenerNegocio;
