import React from "react";
import Oferta from "./Oferta";
import styles from "./MostrarOfertas.css";
import { Row, Col } from "react-bootstrap";

const MostrarOfertas = (props) => {
  return (
    <>
      {props.ofertas.map((oferta) => {
        return (
          <Col>
            <Oferta
              oferta={oferta}
              deleteOferta={props.deleteOferta}
              editOferta={props.editOferta}
              key={oferta._id}
            />
          </Col>
        );
      })}
    </>
  );
};

export default MostrarOfertas;
