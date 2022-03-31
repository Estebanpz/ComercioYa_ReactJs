import { auth } from "./firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
const RestablecerPassword = async(email)=> {
    const user =  await sendPasswordResetEmail(auth, email);
    return user;
}
export default RestablecerPassword;