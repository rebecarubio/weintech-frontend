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
  CardDeck,
  ButtonGroup,
  CardColumns,
} from "react-bootstrap";
import CrearOferta from "./CrearOferta";

const ListaOfertasEmpresa = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { empresaId, ofertaId } = useParams();
  const [ofertas, setOfertas] = useState([]);
  const [ofertaEditar, setOfertaEditar] = useState();

  async function fetchData() {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta?empresa=${empresaId}`,
      {
        //mode: "cors",
        method: "GET",
        credentials: "include",
      }
    );
    const responseJson = await res.json();
    console.log(responseJson.data);
    setOfertas(responseJson.data);
  }

  function alertClicked() {
    alert("Confirma que deseas eliminar esta oferta");
  }

  async function eliminarOferta(id) {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta/${id}`,
      {
        //mode: "cors",
        method: "DELETE",
        credentials: "include",
      }
    );
    const responseJson = await res.json();

    const arrayNuevo = ofertas.filter((oferta) => oferta._id !== id);
    setOfertas(arrayNuevo);
  }

  async function editarOferta(id) {
    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta/${id}`,
      {
        //mode: "cors",
        method: "PATCH",
        credentials: "include",
      }
    );
    const responseJson = await res.json();
  }

  useEffect(() => {
    fetchData();
  }, [ofertaEditar]);

  return (
    <>
      <Container>
        {ofertaEditar && (
          <CrearOferta
            setOfertaEditar={setOfertaEditar}
            oferta={ofertaEditar}
          />
        )}

        {ofertas.length > 0 && !ofertaEditar && (
          <>
            <h3>Mis ofertas: </h3>
            <CardColumns>
              {ofertas.map((oferta, i) => (
                <Card style={{ width: "17rem" }}>
                  <Card.Img
                    height="30rem"
                    width="30rem"
                    variant="top"
                    src={
                      `${process.env.REACT_APP_API_ADDRESS}/uploads/` +
                      auth.userObj.foto
                    }
                  />
                  <Card.Body>
                    <Card.Title>{oferta.titulo}</Card.Title>
                    <Card.Text>{oferta.descripcion}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{oferta.puesto}</ListGroupItem>
                    <ListGroupItem>{oferta.sector}</ListGroupItem>
                    <ListGroupItem>{oferta.salario}</ListGroupItem>
                  </ListGroup>
                  <Card.Body className="p-1">
                    <ButtonGroup className="sm">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          history.push("/oferta/" + oferta._id + "/candidatos/")
                        }
                      >
                        Candidatos
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setOfertaEditar(oferta)}
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => eliminarOferta(oferta._id)}
                        variant="secondary"
                      >
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </CardColumns>
          </>
        )}
      </Container>
    </>
  );
};

export default ListaOfertasEmpresa;
