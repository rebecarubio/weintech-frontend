import React, { Component, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown, Image } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import logo from "./logo.png";
import "./Menu.css";

const Menu = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <NavLink className="navLink" to="/">
        <Navbar.Brand
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            history.push("/");
            window.location.reload();
          }}
        >
          <img src={logo} style={{ width: "4rem" }} />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink className="navLink" to="/proyecto">
              Proyecto
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink className="navLink" to="/contacta">
              Contacta
            </NavLink>
          </Nav.Link>
          <NavDropdown title="Recursos" id="collasible-nav-dropdown">
            <NavDropdown.Item href="https://adalab.es/" target="_blank">
              Adalab
            </NavDropdown.Item>
            <NavDropdown.Item
              href="http://www.womeninmobile.org/"
              target="_blank"
            >
              Women in Mobile
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://codebar.io/barcelona"
              target="_blank"
            >
              Codebar
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://spain.girlsintech.org/"
              target="_blank"
            >
              Girls in tech
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://www.girldevelopit.com/"
              target="_blank"
            >
              Girls develop it
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://www.allwomen.tech" target="_blank">
              AllWomen Bootcamp
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://madridforrefugees.org/es/la-organizacion/mfr-coding-es/"
              target="_blank"
            >
              MFR Coding{" "}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!auth.userId && (
            <Nav.Link className="navLink">
              <NavLink className="navLink" to="/login">
                Acceso Candidato
              </NavLink>
            </Nav.Link>
          )}
          {!auth.userId && (
            <Nav.Link>
              <NavLink className="navLink" to="/loginempresa">
                Acceso Empresa
              </NavLink>
            </Nav.Link>
          )}
          {auth.userId && !auth.isEmpresa && (
            <Nav.Link>
              <NavLink className="navLink" to={"/espaciocandidato"}>
                <Dropdown className="pr-5">
                  <Image
                    src={
                      `${process.env.REACT_APP_API_ADDRESS}/uploads/` +
                      auth.userObj.foto
                    }
                    roundedCircle
                    style={{
                      "object-cover": "fit",
                      height: "2.5rem",
                      width: "2.5rem",
                    }}
                  />
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Mi perfil
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        history.push("/candidato/edit/" + auth.userId)
                      }
                    >
                      Editar Perfil
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        auth.logout();
                        history.push("/");
                      }}
                    >
                      Cerrar Sesion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </NavLink>
            </Nav.Link>
          )}
          {auth.userId && auth.isEmpresa && (
            <Nav.Link>
              <NavLink className="navLink" to={"/empresa/" + auth.userId}>
                <Dropdown className="pr-5">
                  <Image
                    src={
                      `${process.env.REACT_APP_API_ADDRESS}/uploads/` +
                      auth.userObj.foto
                    }
                    roundedCircle
                    style={{
                      "object-cover": "fit",
                      height: "2.5rem",
                      width: "2.5rem",
                    }}
                  />
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Mi perfil
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        history.push("/empresa/crear/" + auth.userId)
                      }
                    >
                      Crear Oferta
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        history.push("/empresa/edit/" + auth.userId)
                      }
                    >
                      Editar Perfil
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        auth.logout();
                        history.push("/");
                      }}
                    >
                      Cerrar Sesion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </NavLink>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
