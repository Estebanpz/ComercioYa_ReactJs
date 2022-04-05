import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";

const useObtenerNegocios = () => {
    const [negocios, setNegocios] = useState([]);

    const unSubscribe = async () => {
        const querySnapshot = await getDocs(collection(db, "Comerciantes"));
        const arrNegocios = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setNegocios(arrNegocios);
    };


    useEffect(() => {
        unSubscribe();
        return () => {
            unSubscribe();
        };
    }, []);

    return [negocios, setNegocios, unSubscribe];
}

export default useObtenerNegocios;