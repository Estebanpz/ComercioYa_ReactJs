import React,{useContext, useState, useEffect} from 'react';
import {auth, onAuthStateChanged} from "./../Firebase/firebaseConfig";
//Contexto
const AuthContext = React.createContext();
//Hooks para conectarnos al contexto
const useAuth = () =>{
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [cargando, setCargando] = useState(true);

    //UseEffect para verificar si hay un usuario o no
    useEffect(() =>{
        //Comprobamos si hay un usuario
         const cancelarSuscripcion = onAuthStateChanged(auth, (user) =>{
                setUser(user);
                setCargando(false);
         });

         return cancelarSuscripcion;
    },[]);
    return (  
            <AuthContext.Provider value={{user, setUser}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthContext, AuthProvider, useAuth};