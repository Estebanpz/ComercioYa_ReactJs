import {db} from "./firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const GuardarNegocio = async(datos) =>{
    try{
        const docRef = collection(db, "Comerciantes");
        await addDoc(docRef, datos);
        console.log(docRef.id);
    }catch(error){
        console.log(error);
    }
}
