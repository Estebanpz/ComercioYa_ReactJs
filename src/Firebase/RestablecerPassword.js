import { auth } from "./firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
const RestablecerPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
}
export default RestablecerPassword;