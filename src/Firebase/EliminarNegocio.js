import {db} from "./firebaseConfig";
import {collection, query, where, getDocs, deleteDoc} from "firebase/firestore";

const EliminarNegocio = async (id) =>{
    const referencia = collection(db, "Comerciantes");
    const consulta = query(referencia, where('Userid', '==', id));
    const result = await getDocs(consulta);
    result.forEach(async(doc)=>{
       console.log(doc.ref);
       try {
           await deleteDoc(doc.ref)
       } catch (error) {
        console.log(error);
       }
    })
}
export default EliminarNegocio;