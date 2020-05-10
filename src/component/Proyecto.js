import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import Escalera from "../assets/img/escalera.png";
import EscaleraCut from "../assets/img/escalera2.png";

const Proyecto = (props) => {
  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <h5>
          We in Tech tiene como objetivo alentar a más mujeres y personas
          subrepresentadas en los sectores STEM y promover la diversidad, la
          inclusión y la equidad en la tecnología.
        </h5>
      </Tooltip>
    );
  }

  const Example = () => (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success">¡Hola y bienvenid@!</Button>
    </OverlayTrigger>
  );

  return (
    <Container className="p-0">
      <Row className="justify-content-center p-0">
        <Col md={8} sm={12} className="p-0">
          <Card style={{ border: "none" }}>
            <Card.Img md={6} src={EscaleraCut} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title></Card.Title>
              <Card.Text>
                <Example></Example>{" "}
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Proyecto;
