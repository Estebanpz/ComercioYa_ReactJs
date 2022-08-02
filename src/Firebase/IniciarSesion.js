import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const IniciarSesion = async (email, password) => {

        try {
                const user = await signInWithEmailAndPassword(auth, email, password);
                if (!user.emailVerified) {
                        return false;
                } else if (user.emailVerified) {
                        return user;
                }
        } catch (error) {
                console.log(error)
        }
};
export default IniciarSesion;