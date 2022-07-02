import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./../Context/AuthContext";
import { useParams } from "react-router-dom";
import useObtenerNegocio from "../Hooks/useObtenerNegocio";
import EliminarNegocio from "../Firebase/EliminarNegocio";
//Importando iconos
import { AiOutlineSave } from "react-icons/ai";
import { BsCheckCircle, BsXCircle, BsTrash2 } from "react-icons/bs";
// Importando el toast y Toaster
import toast, { Toaster } from "react-hot-toast";
// Importanto SVG Crear Negocio
import { ReactComponent as IconoCrearNegocio } from "../img/crear-negocio-persona.svg";
import styled from "styled-components";
const Negocio = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [DatosNegocio, setDatosNegocio] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    telefono: "",
    direccion: "",
    productos: "",
  });

  //Invoco la funcion que me retorna el negocio del Usuario
  const [negocio, cambiarNegocio] = useObtenerNegocio(id);

  //Invoco la funcion de notificacion Toast
  useEffect(() => {
    setTimeout(() => {
      if (negocio) {
        setCargando(false);
        setDatosNegocio({
          nombre: negocio[0]?.nombre,
          descripcion: negocio[0]?.descripcion,
          imagen: negocio[0]?.imagen,
          telefono: negocio[0]?.telefono,
          direccion: negocio[0]?.direccion,
          productos: negocio[0]?.productos,
        });
      }
    }, 300);
  }, [negocio, user, cargando]);

  // Funcion que maneja el cambio de los inputs
  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    switch (e.target.name) {
      case "nombre":
        setDatosNegocio({
          ...DatosNegocio,
          nombre: e.target.value,
        });
        break;
      case "descripcion":
        setDatosNegocio({
          ...DatosNegocio,
          descripcion: e.target.value,
        });
        break;
      case "telefono":
        setDatosNegocio({
          ...DatosNegocio,
          telefono: e.target.value,
        });
        break;
      case "direccion":
        setDatosNegocio({
          ...DatosNegocio,
          direccion: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  // Ventana de confirmacion o no
  const notificacion = () => {
    toast((t) => (
      <>
        <span>¿Desea guardar los cambios?</span>
        <button
          className="btn btn-info"
          onClick={() => {
            toast.success("Cambios guardados con exito", {
              style: {
                background: "green",
                color: "white",
                fontSize: ".9rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "10px",
              },
            });
            toast.dismiss(t.id);
          }}
        >
          <BsCheckCircle />
          Si
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            toast.error("Cambios no guardados");
            toast.dismiss(t.id);
          }}
        >
          <BsXCircle />
          No
        </button>
      </>
    ));
  };
  // Funcion Submit
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(DatosNegocio);
    notificacion();
  };

  const DeleteNegocio = async () => {
    toast((t) => (
      <>
        <span>¿Deseas eliminar tu negocio?</span>
        <button
          className="btn btn-info"
          onClick={async () => {
            await EliminarNegocio(user.uid);
            cambiarNegocio("");

            toast.error("Negocio Eliminado", {
              className: "btn btn-danger text-uppercase rounded d-block",
            });
            toast.dismiss(t.id);
          }}
        >
          <BsCheckCircle />
          Si
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            toast.success("Tu negocio sigue a salvo...", {
              className: "btn btn-info text-uppercase rounded",
            });
            toast.dismiss(t.id);
          }}
        >
          <BsXCircle />
          No
        </button>
      </>
    ));
  };

  return (
    <>
      {negocio.length !== 0 && !cargando ? (
        <> </>
      ) : cargando ? (
        <>
          <div className="row justify-content-center aling-items-center my-4">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <Loader>
                <Circle />
                <Circle />
                <Circle />
              </Loader>
            </div>
          </div>
        </>
      ) : (
        <div className="w-100">
          <Titulo>
            <h1>No has registrado tu negocio aun.</h1>
          </Titulo>
          <ContenedorSvg to="/crear-negocio" className="nav-link link-active">
            <IconoCrearNegocio />
          </ContenedorSvg>
        </div>
      )}
    </>
  );
};

const ContenedorSvg = styled(NavLink)`
  width: 90%;
  height: 70%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  & > svg {
    width: 90%;
    height: auto;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
`;

const Titulo = styled.div`
  margin-top: 2rem;
  padding: 0;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Loader = styled.div`
  height: auto;
  width: 100%;
  border-radius: 50%;
  display: flex;
`;

const Circle = styled.div`
  background: deepskyblue;
  width: 20px;
  height: 20px;
  margin: 0 4px;
  border-radius: 50%;
  animation: animate 2s infinite linear;

  > :nth-child(1) {
    animation-delay: 0.5s;
  }

  > :nth-child(2) {
    animation-delay: 1s;
  }

  > :nth-child(3) {
    animation-delay: 1.5s;
  }

  @keyframes animate {
    0%,
    100% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }
  }
`;

export default Negocio;
