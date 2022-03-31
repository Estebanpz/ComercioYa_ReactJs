import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const IniciarSesion = async (email, password) => {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
};
export default IniciarSesion;