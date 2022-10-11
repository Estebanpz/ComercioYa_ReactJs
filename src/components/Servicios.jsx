import styled from "styled-components";
import pc from "./../img/pc.svg";
const Servicios = () => {
  return (
    <>
      <Contenedor className="contenedor" id="servicio">
        <h2 className="subtitulo">Nuestro servicio</h2>
        <div className="contenedor-servicio">
          <img src={pc} alt="" />
          <div className="checklist-servicio">
            <div className="servis">
              <h3 className="n-service">
                <span className="number">1</span>Apoyamos el comercio local de
                Giradot
              </h3>
              <p>
                Si tu negocio es minorista e informal y esta ubicado en
                Girardot, queremos apoyarte para que tu establecimiento crezca y
                puedas obtener mejor rentabilidad.
              </p>
            </div>
            <div className="servis">
              <h3 className="n-service">
                <span className="number">2</span>Hacemos que tu negocio este en
                la web
              </h3>
              <p>
                Estar en la web es una de las mejores opciones en la actualidad,
                ya que esto permite que tu establecimiento obtenga mayor
                beneficios logrando que sea visible para una mayor cantidad de
                personas
              </p>
            </div>
            <div className="servis">
              <h3 className="n-service">
                <span className="number">3</span>Permitimos que más personas
                lleguen a tu negocio
              </h3>
              <p>
                Si tu establecimiento esta en la web, tus beneficios aumentan ya
                que esto hace que más compradores lleguen a tu negocio
                permitiendo que una mayor cantidad de personas lo conozcan.
              </p>
            </div>
          </div>
        </div>
      </Contenedor>
    </>
  );
};

const Contenedor = styled.section`
  width: 100%;
  overflow: hidden;
  margin: auto;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
  text-align: center;

  & > .subtitulo {
    text-align: center;
    font-weight: 300;
    color: #7209b7;
    margin-bottom: 40px;
    font-size: 40px;
    font-weight: bold;
  }

  & > .contenedor-servicio {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

  &  > .contenedor-servicio > img {
    width: 40%;
    margin-bottom: 40px;
  }

  & > .contenedor-servicio > .checklist-servicio {
    width: 45%;
    margin-bottom: 15px;
  }

  & > div > .checklist-servicio > .servis {
    margin-bottom: 20px;
    padding: 7px;
  }

  & > div > .checklist-servicio > .servis > .n-service {
    /*margin-bottom:7px;*/
    color: #7209b7;
    font-size: 22px;
  }

  & > div > .checklist-servicio > .servis > .n-service > .number {
    display: inline-block;
    background-image: linear-gradient(to top, #7209b7 0%, #fbc2eb 100%);
    width: 30px;
    height: 30px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    font-weight: 600;
    line-height: 30px;
    margin-right: 5px;
  }
`;

export default Servicios;
