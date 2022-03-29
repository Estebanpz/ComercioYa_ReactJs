import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function RegistrarUsuario (email, password, nombre,apellido) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        user.displayName = nombre + ' ' + apellido;
        console.log(user);
        alert('Usuario registrado con exito');
        return user;
    } catch (error) {
        console.error(error);
    }
}
