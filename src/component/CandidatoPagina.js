import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import {
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Button,
} from "react-bootstrap";
import Notificacion from "../component/util/Notificacion";

const CandidatoPagina = (props) => {
  const history = useHistory();
  const { candidatoId } = useParams();
  const [candidato, setCandidato] = useState([]);
  const auth = useContext(AuthContext);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/candidato/${candidatoId}/`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
      }
    );
    const candidato = await res.json();
    setCandidato(candidato);
    console.log("estoy aki");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Card className="m-4 text-center">
        <Card.Header>
          {candidato.nombre + " " + candidato.primerapellido}{" "}
        </Card.Header>
        <Card.Body>
          <Card.Img
            className="mb-2"
            style={{ width: "15rem" }}
            rounded
            src={
              `${process.env.REACT_APP_API_ADDRESS}/uploads/` + candidato.foto
            }
          />
          {candidato.profesion && (
            <Card.Title>{"Profesión: " + candidato.profesion}</Card.Title>
          )}
          {candidato.provincia && (
            <Card.Subtitle className="mb-2 text-muted">
              {"Provincia: " + candidato.provincia}
            </Card.Subtitle>
          )}
          {candidato.telefono && (
            <Card.Text className="mb-4">
              {"Teléfono: " + candidato.telefono}
            </Card.Text>
          )}
          <Card.Text className="mb-4">{"Email: " + candidato.email}</Card.Text>

          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => window.history.back()}
          >
            Volver
          </Button>
          {candidato.cv && (
            <Button variant="primary" className="ml-2">
              <a
                style={{ color: "inherit", textDecoration: "inherit" }}
                href={
                  `${process.env.REACT_APP_API_ADDRESS}/uploads/` + candidato.cv
                }
                target="_blank"
                download
              >
                Descargar CV
              </a>
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CandidatoPagina;
