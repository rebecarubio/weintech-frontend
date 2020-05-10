import React, { useContext, useState, useEffect, useCallback } from "react";
import Menu from "./component/Menu";
import AutoCompleteText from "./component/AutoCompleteText";
import MostrarOfertas from "./component/MostrarOfertas";
import RegistroCandidato from "./component/RegistroCandidato";
import LoginCandidato from "./component/LoginCandidato";
import LoginEmpresa from "./component/LoginEmpresa";
import RegistroEmpresa from "./component/RegistroEmpresa";
import { Router, Route, Switch, BrowserRouter, Link } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import PerfilCandidato from "./component/PerfilCandidato";
import { Col, Row, Container, Jumbotron, Card } from "react-bootstrap";
import buildUrl from "build-url";

import ListaOfertasEmpresa from "./component/ListaOfertasEmpresa";
import PerfilEmpresa from "./component/PerfilEmpresa";
import CrearOferta from "./component/CrearOferta";
import OfertaPagina from "./component/OfertaPagina";
import Proyecto from "./component/Proyecto";
import Contacta from "./component/Contacta";
import ListaCandidatosInscritos from "./component/ListaCandidatosInscritos";
import CandidatoPagina from "./component/CandidatoPagina";
import ListaOfertasCandidato from "./component/ListaOfertasCandidato";
import { CardBody } from "react-bootstrap/Card";

const App = () => {
  const [userObj, setUserObj] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [haBuscado, setHaBuscado] = useState(false);

  const login = (userObj) => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        user: userObj,
      })
    );
    setUserId(userObj._id);
    setUserObj(userObj);
  };
  const logout = () => {
    setUserObj({});
    setUserId(null);
    localStorage.removeItem("currentUser");
  };

  useEffect(() => {
    const cookieData = JSON.parse(localStorage.getItem("currentUser"));
    cookieData && cookieData.user && login(cookieData.user);
  }, []);

  const fetchOfertas = async (opciones) => {
    setHaBuscado(true);
    setCargando(true);
    const { titulo, sector, provincia, salarioDesde } = opciones;
    console.log(opciones);
    const url = buildUrl(
      `${process.env.REACT_APP_API_ADDRESS}/api/oferta/buscar`,
      {
        queryParams: opciones,
      }
    );

    console.log(url);

    const respuesta = await fetch(url);

    const respuestaJson = await respuesta.json();
    setOfertas(respuestaJson.data);
    setCargando(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userObj: userObj,
        isEmpresa: !!userObj.sector,
        isLoggedIn: !!userId,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Menu />
        <Container style={{ height: "auto", minHeight: "100%" }}>
          <Row className="justify-content-center">
            <Col md={12}>
              <Switch>
                <Route path="/signup">
                  <RegistroCandidato />
                </Route>
                <Route path="/login">
                  <LoginCandidato />
                </Route>
                <Route path="/espaciocandidato">
                  <ListaOfertasCandidato />
                </Route>
                <Route path="/signupempresa">
                  <RegistroEmpresa />
                </Route>
                <Route path="/loginempresa">
                  <LoginEmpresa />
                </Route>
                <Route path="/candidato/edit/:candidatoId">
                  <PerfilCandidato />
                </Route>
                <Route path="/candidato/:candidatoId">
                  <CandidatoPagina />
                </Route>
                <Route path="/empresa/crear/:empresaId">
                  <CrearOferta />
                </Route>
                <Route path="/empresa/edit/:empresaId">
                  <PerfilEmpresa />
                </Route>
                <Route path="/empresa/:empresaId">
                  <ListaOfertasEmpresa />
                </Route>
                <Route path="/oferta/:ofertaId/candidatos">
                  <ListaCandidatosInscritos />
                </Route>
                <Route path="/oferta/:ofertaId">
                  <OfertaPagina />
                </Route>

                <Route path="/proyecto">
                  <Proyecto />
                </Route>
                <Route path="/contacta">
                  <Contacta />
                </Route>

                <Route path="/">
                  <AutoCompleteText
                    haBuscado={haBuscado}
                    ofertasLength={ofertas.length}
                    fetchOfertas={fetchOfertas}
                    cargando={cargando}
                  />

                  {ofertas.length > 0 && <MostrarOfertas ofertas={ofertas} />}
                  {haBuscado && ofertas.length === 0 && (
                    <Card
                      md={12}
                      fluid
                      className="mt-2 text-center"
                      bg="light"
                      border="info"
                    >
                      <Card.Title className="m-2 text-muted">
                        No existen ofertas con estos criterios
                      </Card.Title>
                      <Card.Text className="m-2 text-muted">
                        Intenta ampliar tu búsqueda{" "}
                      </Card.Text>
                    </Card>
                  )}
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
