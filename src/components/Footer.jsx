import styled from "styled-components";
import { BsEnvelope } from "react-icons/bs";
const Footer = () => {
  return (
    <footer>
      <div className="container p-1">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <Subtitulo className="subtitulo">
              <strong>contacto</strong>
            </Subtitulo>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 offset-sm-3 offset-md-3 offset-lg-3 offset-xl-3 text-center ">
            <ul className="list-group text-dark  border border-info copy">
              <li
                className="list-group-item d-inline-block correo  border border-info"
                data-target="esteban"
              >
                <Icon>
                  <BsEnvelope />
                </Icon>
                estebanpl81@gmail.com
              </li>

              <li
                className="list-group-item d-inline-block correo  border border-info"
                data-target="erika"
              >
                <Icon>
                    <BsEnvelope/>
                </Icon>
                erika93_11@hotmail.com
              </li>

              <li
                className="list-group-item d-inline-block correo  border border-info"
                data-target="sebastian"
              >
                <Icon>
                    <BsEnvelope />
                </Icon>
                sebastianri827@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center text-white bg-info p-2 font-weight-bold">
        Copyrigth &copy; 2022
      </p>
    </footer>
  );
};

const Subtitulo = styled.h3`
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
  color: #7209b7;
  margin-bottom: 40px;
  font-size: 40px;
  font-weight: bold;
`;

const Icon = styled.span`
    margin: .1rem;
  & > svg {
    height: 1.5rem;
    width: 2rem;
    color: #4895EF;
  }
`;
export default Footer;
