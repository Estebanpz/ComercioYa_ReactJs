import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegistrarUsuario = async(email, password, nombre,apellido)=> {  
        const user =  await createUserWithEmailAndPassword(auth, email, password);
        user.displayName = nombre + ' ' + apellido;
        console.log(user);
};
export default RegistrarUsuario;