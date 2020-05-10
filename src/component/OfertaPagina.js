import React, { useState, useContext, useEffect } from "react";
import { Table, Card, Button } from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Notificacion from "./util/Notificacion";

const OfertaPagina = (props) => {
  const history = useHistory();
  const { ofertaId } = useParams();
  const [oferta, setOferta] = useState();
  const [empresa, setEmpresa] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const [yaInscrito, setYaInscrito] = useState(false);

  const [showNotificacionError, setShowNotificacionError] = useState(false);
  const [showNotificacionSuccess, setShowNotificacionSuccess] = useState(false);
  const [showNotificacionLogin, setShowNotificacionLogin] = useState(false);

  async function fetchData() {
    const response = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta/${ofertaId}/`,
      { mode: "cors" }
    );

    const respuestaJson = await response.json();
    console.log(respuestaJson);
    setOferta(respuestaJson);

    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/empresa/${respuestaJson.empresa}/`,
      { mode: "cors" }
    );
    const empresaData = await res.json();
    setEmpresa(empresaData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function inscribeCandidato() {
    if (auth.isEmpresa) {
      setShowNotificacionError("Empresas no pueden inscribirse.");
      setTimeout(() => setShowNotificacionError(false), 2000);
      return;
    }

    console.log("ISEMPRESA", auth.isEmpresa);
    if (auth.userId) {
      if (
        oferta.candidatos.filter((candidato) => candidato === auth.userId)
          .length > 0
      ) {
        setShowNotificacionError("Ya estás inscrito");
        setTimeout(() => setShowNotificacionError(false), 2000);
        return;
      }

      const respuesta = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/api/oferta/${ofertaId}/inscribeCandidato`,
        {
          mode: "cors",
          method: "PATCH",
          body: JSON.stringify({ candidatoId: auth.userId }),
          credentials: "include",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      console.log(await respuesta.json());
      setShowNotificacionSuccess("login correcto");
      setTimeout(() => setShowNotificacionSuccess(false), 2000);
    } else {
      setShowNotificacionLogin("no estás logueado");
      setTimeout(() => setShowNotificacionLogin(false), 2000);
      return;
    }
  }

  return (
    <>
      {!isLoading && (
        <Card className="mt-4 text-center">
          <Card.Header>{"Sector: " + oferta.sector}</Card.Header>
          <Card.Body>
            <Card.Img
              style={{ width: "15rem" }}
              rounded
              src={
                `${process.env.REACT_APP_API_ADDRESS}/uploads/` + empresa.foto
              }
            />
            <Card.Title>{oferta.titulo}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {"Empresa: " + empresa.nombre}
            </Card.Subtitle>
            <Card.Text className="mb-4">{oferta.descripcion}</Card.Text>
            <Notificacion
              show={showNotificacionSuccess}
              variant="success"
              mensaje="¡Te has inscrito correctamente!"
            />
            <Notificacion
              show={showNotificacionError}
              variant="danger"
              mensaje={showNotificacionError}
            />
            <Notificacion
              show={showNotificacionLogin}
              variant="warning"
              mensaje="Crea una cuenta para inscribirte"
            />
            <Button variant="primary" onClick={() => inscribeCandidato()}>
              Inscribete!
            </Button>

            <Button
              variant="secondary"
              className="ml-2"
              onClick={() => window.history.back()}
            >
              Volver
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default OfertaPagina;
