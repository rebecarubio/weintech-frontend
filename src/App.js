import React, { useContext, useState, useEffect, useCallback } from "react";
import Menu from "./component/Menu";
import AutoCompleteText from "./component/AutoCompleteText";
import MostrarOfertas from "./component/MostrarOfertas";
import RegistroCandidato from "./component/RegistroCandidato";
import LoginCandidato from "./component/LoginCandidato";
import LoginEmpresa from "./component/LoginEmpresa";
import RegistroEmpresa from "./component/RegistroEmpresa";
import ListaOfertasCandidato from "./component/ListaOfertasCandidato";
import { Router, Route, Switch, BrowserRouter, Link } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import PerfilCandidato from "./component/PerfilCandidato";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import buildUrl from "build-url";

import ListaOfertasEmpresa from "./component/ListaOfertasEmpresa";
import PerfilEmpresa from "./component/PerfilEmpresa";
import CrearOferta from "./component/CrearOferta";
import OfertaPagina from "./component/OfertaPagina";
import Proyecto from "./component/Proyecto";
import Contacta from "./component/Contacta";
import ListaCandidatosInscritos from "./component/ListaCandidatosInscritos";
const App = () => {
  const [userObj, setUserObj] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [haBuscado, setHaBuscado] = useState(false);

  const login = (userObj) => {
    //if (expiration < Date.now()) return logout();

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        //expiration: expiration ? expiration : Date.now() + 120 * 60 * 1000,
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
    const { titulo, sector, provincia, empresa, salarioDesde } = opciones;

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

  const deleteOferta = async (idOferta) => {
    await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/oferta` + idOferta, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      //.then(M.toast({ html: "Oferta eliminada correctamente" }))
      .then(setOfertas(ofertas.filter((oferta) => oferta._id !== idOferta)))
      .catch((e) => console.log(e));
  };

  const editOferta = async (idOferta) => {
    await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/oferta/` + idOferta, {
      method: "PATCH",
      //body:
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      //.then(M.toast({ html: "Oferta eliminada correctamente" }))
      .then(setOfertas(ofertas.filter((oferta) => oferta._id !== idOferta)))
      .catch((e) => console.log(e));
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
                  <ListaOfertasCandidato />
                </Route>
                <Route path="/empresa/:empresaId/modificarOferta/:ofertaId">
                  <ListaOfertasEmpresa />
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

                  <Row>
                    {ofertas.length > 0 && (
                      <MostrarOfertas
                        deleteOferta={deleteOferta}
                        ofertas={ofertas}
                        editOferta={editOferta}
                      />
                    )}
                    {haBuscado && ofertas.length === 0 && (
                      <Jumbotron md={12}>
                        <h1>No hay ofertas con esos criterios</h1>
                        <p>Intenta ampliar tu búsqueda</p>
                      </Jumbotron>
                    )}
                  </Row>
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
