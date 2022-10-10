import {storage} from "./firebaseConfig";
import {ref, uploadBytes, listAll} from "firebase/storage"

const SubirImagen = async(file, uid) => {
    const referencia = ref(storage, `comerciantes_perfil/${uid}`);
    const Lista = await listAll(referencia);
    const carpeta_Usuario = ref(storage, `comerciantes_perfil/${uid}/${Lista.items.length+1}`);
    const response = await uploadBytes(carpeta_Usuario, file);
    return {response}
}
export default SubirImagen;