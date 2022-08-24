import { useState } from 'react';
const useFormValidacion = () => {
    const [error, setError] = useState({});
    const [valido, setValido] = useState(false);

    const validacion = (e, name, value) => {
        const regex = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
        switch (name) {
            case 'nombre':
                if (!regex.test(value)) {
                    setValido(false);
                    setError({
                        ...error,
                        nombre: "El nombre es incorrecto, solo se aceptan letras y sin espacios"
                    });
                } else {
                    setValido(true);
                    setError({
                        ...error,
                        nombre: ""
                    });

                };
                break;
            case 'apellido':
                if (!regex.test(value)) {
                    setValido(false);
                    setError({
                        ...error,
                        apellido: "El apellido es incorrecto, solo se aceptan letras y sin espacios"
                    });

                } else {
                    setValido(true);
                    setError({
                        ...error,
                        apellido: ""
                    });

                };
                break;
            case 'correo':
                const regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

                if (!regexCorreo.test(value)) {
                    setValido(false);
                    setError({
                        ...error,
                        correo: "El correo es incorrecto"
                    });

                } else {
                    setValido(true);
                    setError({
                        ...error,
                        correo: ""
                    });
                };
                break;
            case 'contrasena':
                const regexContrasena = /\w{0,8}$/;
                if (value.length < 6 || !regexContrasena.test(value)) {
                    setValido(false);
                    setError({
                        ...error,
                        contrasena: "La contraseña debe tener al menos 6 caracteres. Valido solo letras y numeros."
                    });
                } else if (value.length > 9) {
                    setValido(false);
                    setError({
                        ...error,
                        contrasena: "Máximo de 8 caracteres."
                    });
                } else {
                    setValido(true);
                    setError({
                        ...error,
                        contrasena: ""
                    });
                }

                break;

            case 'contrasena2':
                if (value !== document.getElementById('contrasena').value) {
                    setValido(false);
                    setError({
                        ...error,
                        contrasena2: "Las contraseñas no coinciden"
                    });

                } else {
                    setError({
                        ...error,
                        contrasena2: ""
                    });
                    setValido(true);
                }
                break;
            default:
                break;
        };
    };

    return { error, validacion, setError, valido };
}

export default useFormValidacion;
