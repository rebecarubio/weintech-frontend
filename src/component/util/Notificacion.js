import React from "react";
import { Alert, Collapse } from "react-bootstrap";

const Notificacion = (props) => {
  return (
    <Collapse className="mt-4" unmountOnExit in={props.show}>
      <Alert variant={props.variant}>{props.mensaje}</Alert>
    </Collapse>
  );
};

export default Notificacion;
