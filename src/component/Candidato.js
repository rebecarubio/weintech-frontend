import React from "react";
import { Table, Card, Button } from "react-bootstrap";

import { useHistory, useParams, useLocation } from "react-router-dom";
const Candidato = (props) => {
  const history = useHistory();

  return (
    <Card width="100" className="m-2">
      <Card.Header>{props.candidato.profesion}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" />
        <Card.Title>{props.candidato.nombre}</Card.Title>
        <Card.Text>{props.candidato.provincia}</Card.Text>
        <Button
          onClick={() => history.push("/candidato/" + props.candidato._id)}
          variant="primary"
        >
          Ver Candidato
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Candidato;
