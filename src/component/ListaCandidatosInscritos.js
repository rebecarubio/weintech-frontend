import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import {
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Button,
  Image,
  Col,
  CardDeck,
  ButtonGroup,
  CardColumns,
  OverlayTrigger,
  Tooltip,
  Nav,
} from "react-bootstrap";
import CrearOferta from "./CrearOferta";

const ListaCandidatosInscritos = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { empresaId, ofertaId } = useParams();
  const [oferta, setOferta] = useState([]);
  const [ofertaEditar, setOfertaEditar] = useState();
  const [candidatos, setCandidatos] = useState([]);

  async function fetchData() {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta/${ofertaId}?populate=candidatos`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
      }
    );
    const oferta = await res.json();
    console.log(oferta.candidatos[11]);
    setOferta(oferta);
    setCandidatos(oferta.candidatos);
  }

  async function eliminarCandidato(candidatoId) {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta/${ofertaId}/borraCandidato`,
      {
        mode: "cors",
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ candidatoId: candidatoId }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await res.json();

    const arrayNuevo = candidatos.filter(
      (candidato) => candidato._id !== candidatoId
    );
    setCandidatos(arrayNuevo);
  }

  function renderTooltip(props) {
    console.log(props);
    return (
      <Tooltip id="button-tooltip">
        <h5>{props}</h5>
      </Tooltip>
    );
  }

  const BotonEmail = (props) => {
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 2000 }}
        overlay={renderTooltip(props.email)}
      >
        <Button as="a" href={"mailto:" + props.email} variant="success">
          Contactar
        </Button>
      </OverlayTrigger>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CardColumns>
        {candidatos.map((candidato, i) => (
          <Card style={{ width: "17rem" }} className="m-2 text-center">
            <Card.Img
              fluid
              variant="top"
              src={
                candidato.foto
                  ? `${process.env.REACT_APP_API_ADDRESS}/uploads/` +
                    candidato.foto
                  : `${process.env.REACT_APP_API_ADDRESS}/uploads/default.jpg`
              }
            />

            <Card.Body>
              <Card.Title>
                {candidato.nombre + " " + candidato.primerapellido}
              </Card.Title>
              {candidato.profesion && (
                <Card.Text>{"Profesión: " + candidato.profesion}</Card.Text>
              )}
              <Card.Text>{candidato.provincia}</Card.Text>
              <BotonEmail email={candidato.email}></BotonEmail>

              {candidato.cv && (
                <Button variant="primary" className="ml-2">
                  <a
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    href={
                      `${process.env.REACT_APP_API_ADDRESS}/uploads/` +
                      candidato.cv
                    }
                    target="_blank"
                    download
                  >
                    Descargar CV
                  </a>
                </Button>
              )}

              <Button
                className="mt-2"
                variant="secondary"
                onClick={() => {
                  eliminarCandidato(candidato._id);
                }}
              >
                Eliminar del proceso
              </Button>
            </Card.Body>
          </Card>
        ))}
        {candidatos.length === 0 && (
          <Card style={{ width: "20rem", marginTop: "3rem" }}>
            <Card.Body>
              <Card.Title>Todavía no hay candidatos inscritos</Card.Title>
              <Card.Text>Esta oferta no tiene candidatos.</Card.Text>
              <Button
                variant="secondary"
                onClick={() => history.push("/empresa/" + oferta.empresa)}
              >
                Volver
              </Button>
            </Card.Body>
          </Card>
        )}
      </CardColumns>
    </>
  );
};

export default ListaCandidatosInscritos;
