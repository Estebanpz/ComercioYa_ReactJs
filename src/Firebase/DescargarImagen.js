import { storage } from "./firebaseConfig";
import { ref, getDownloadURL, listAll } from "firebase/storage"

const DescargarImagen = async (uid) => {
    const referencia = ref(storage, `comerciantes_perfil/${uid}`);
    const Lista = await listAll(referencia);
    const UltimaImagen = Lista.items[Lista.items.length - 1];
    console.log(UltimaImagen);
    const res = await getDownloadURL(ref(storage, UltimaImagen));
    console.log(res);
    return { res }
}
export default DescargarImagen;