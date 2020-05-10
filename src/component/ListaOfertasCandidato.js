import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useHistory, useParams, useLocation } from "react-router-dom";
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
  Media,
  ButtonGroup,
  CardColumns,
} from "react-bootstrap";

const ListaOfertasCandidato = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [ofertas, setOfertas] = useState([]);

  async function fetchData() {
    if (auth.userId) {
      const res = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/api/oferta/buscar?candidatoId=${auth.userId}`,
        {
          mode: "cors",
          method: "GET",
          credentials: "include",
        }
      );
      const responseJson = await res.json();
      console.log(responseJson.data);
      setOfertas(responseJson.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, [auth.userId]);

  return (
    <>
      <Container>
        {ofertas.length > 0 && (
          <>
            <Card className="mt-4" style={{ borderStyle: "none" }}>
              <h4>Mis candidaturas: </h4>
            </Card>
            <CardColumns className="mt-2">
              {ofertas.map((oferta, i) => (
                <Card md={4}>
                  <Media className="p-2">
                    <img
                      className="m-2 p-1"
                      width="64rem"
                      src={
                        `${process.env.REACT_APP_API_ADDRESS}/uploads/` +
                        oferta.empresa.foto
                      }
                    />
                    <h5>{oferta.titulo}</h5>
                  </Media>

                  <Card.Body>
                    <Card.Text>
                      {oferta.descripcion.substring(0, 200) +
                        (oferta.descripcion.length > 200 ? "..." : "")}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{oferta.puesto}</ListGroupItem>
                    <ListGroupItem>{oferta.sector}</ListGroupItem>
                    <ListGroupItem>{oferta.salario}</ListGroupItem>
                  </ListGroup>
                  <Card.Body className="p-1">
                    <Row className=" justify-content-center ">
                      <ButtonGroup>
                        <Button
                          variant="info"
                          onClick={() => history.push("/oferta/" + oferta._id)}
                        >
                          Ver oferta
                        </Button>
                      </ButtonGroup>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </CardColumns>
          </>
        )}

        {ofertas.length === 0 && (
          <Row>
            <Col>
              <Card
                md={12}
                fluid
                className="mt-2 text-center"
                bg="light"
                border="info"
              >
                <Card.Title className="m-2 text-muted">
                  Todavía no te has inscrito a ninguna oferta.
                </Card.Title>
                <Card.Text className="m-2 text-muted">
                  Usa el buscador para encontrar ofertas.
                </Card.Text>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ListaOfertasCandidato;
