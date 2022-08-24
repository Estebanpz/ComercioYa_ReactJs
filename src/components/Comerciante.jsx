import styled from "styled-components";
const Comerciante = ({ personaje }) => {
  return (
    <Card>
      <div>
        <img src={personaje.image} alt={personaje.name} />
      </div>

      <div>
        <h3>{personaje.name}</h3>
        <p>gender:{personaje.gender}</p>
        <p>{personaje.origin.name}</p>
        <p>{personaje.species}</p>
        {personaje.status === "Alive" ? (
          <p style={{ color: "green" }}>{personaje.status}</p>
        ) : personaje.status === "Dead" ? (
          <p style={{ color: "red" }}>{personaje.status}</p>
        ) : (
          personaje.status === "unknown" && (
            <p style={{ color: "#A9A9A9" }}>{personaje.status}</p>
          )
        )}
      </div>
    </Card>
  );
};

const Card = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;

  & > div > img {
    cursor: pointer;
    border-radius: 50%;
  }

  @media (max-width: 960px) {
    & > div {
      > h3 {
        font-size: 1.1rem;
      }
      > p {
        font-size: 0.9rem;
      }
    }

    & > div > img {
      width: 7.6rem;
    }
  }

  @media (max-width: 768px) {
    & > div {
      > p {
        font-size: 1.2rem;
      }
    }

    & > div > img {
      width: 10rem;
    }
  }

  @media (max-width: 640px) {
    & > div {
      > p {
        font-size: 1rem;
      }
    }

    & > div > img {
      width: 8rem;
    }
  }

  @media (max-width: 400px) {
    & > div {
      > p,
      h3 {
        display: none;
      }
    }
  }

  @media (max-width: 280px) {
    & > div {
      display: none;
    }

    & > div > img {
      width: 6rem;
    }
  }
`;
export default Comerciante;
