import { db } from "../Firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const useObtenerNegocio = () => {
  const [negocio, cambiarNegocio] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      let consulta = query(
        collection(db, "Comerciantes"),
        where("userId", "==", user.uid)
      );
      const unSubscribe = onSnapshot(consulta, (snapshot) => {
        const negocio = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        cambiarNegocio(negocio)
      }, (error) => {
        console.log(error);
      })
      return () => unSubscribe();
    } else {
      return;
    }

  }, [user]);

  return negocio;
}


export default useObtenerNegocio;
