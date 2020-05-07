import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Button,
} from "react-bootstrap";

const ListaOfertasCandidato = (props) => {
  const history = useHistory();
  const { candidatoId } = useParams();

  const buscarOfertas = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/ofertas/${candidatoId}/`,
      {
        //mode: "cors",
        method: "GET",
        credentials: "include",
      }
    );
    const responseJson = await res.json();
    console.log("estoy aki");
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Mis Ofertas</Card.Title>
          {["sm", "md", "lg", "xl"].map((breakpoint, idx) => (
            <ListGroup horizontal={breakpoint} className="my-2" key={idx}>
              <ListGroup.Item>This ListGroup</ListGroup.Item>
              <ListGroup.Item>renders horizontally</ListGroup.Item>
              <ListGroup.Item>on {breakpoint}</ListGroup.Item>
              <ListGroup.Item>and above!</ListGroup.Item>
              <ListGroup.Item>
                <Card.Link href="#">Eliminar</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListaOfertasCandidato;
