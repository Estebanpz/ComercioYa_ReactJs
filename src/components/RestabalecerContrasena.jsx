import React,{useState} from 'react';
//Importando elementos de formulario
import { Formulario, Input, Boton } from '../elementos/ElementosFormulario';
// Importando funcion de Restablecer Contraseña
import RestablecerPassword from '../Firebase/RestablecerPassword';
//Importando el toast y el Toaster
import toast, {Toaster} from "react-hot-toast";
const RestablecerContrasena = () => {
    const [email,setEmail] = useState('');
    //Styles del toast mode Dark
     const darkMode = {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  }};
    // handleChange
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        if(email !== ''){
            try {
                await RestablecerPassword(email);
                toast.success('Se ha enviado un correo a tu cuenta.', darkMode);
            } catch (error) {
                if(error.code  === 'auth/user-not-found'){
                    toast.error('El usuario no existe', darkMode);
                }
                setEmail('');
            }
        }else{
            toast.error('Proporciona un email.', darkMode);
            setEmail('');
        }
    };
    return ( 
        <>
            <Formulario onSubmit={(e)=> handleSubmit(e)}>
                <Input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electronico" 
                    value={email}
                    onChange={(e) => handleChange(e)}
                />
                <Boton type="submit">Restablecer Contraseña</Boton>
            </Formulario>
            <Toaster/>
        </>
     );
}
 
export default RestablecerContrasena;