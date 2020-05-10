import React from "react";
import { Table, Card, Button } from "react-bootstrap";
import OfertaPagina from "./OfertaPagina";
import { useHistory, useParams, useLocation } from "react-router-dom";
const Oferta = (props) => {
  const history = useHistory();

  return (
    <Card md={12} className="mt-2">
      <Card.Header>{props.oferta.sector}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" />
        <Card.Title>{props.oferta.titulo}</Card.Title>
        <Card.Text>
          {" "}
          {props.oferta.descripcion.substring(0, 300) +
            (props.oferta.descripcion.length > 300 ? "..." : "")}
        </Card.Text>
        <Button
          onClick={() => history.push("/oferta/" + props.oferta._id)}
          variant="primary"
        >
          Ver Oferta
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Oferta;
