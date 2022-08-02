import {db} from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
const ActualizarNegocio = async(id, negocio) => {
    const docRef = doc(db, "Comerciantes", id);
    console.log(docRef.id);
    const result = await updateDoc(docRef, negocio);
    return result;
}
 
export default ActualizarNegocio;