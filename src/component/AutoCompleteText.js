import React, { useState, useEffect } from "react";
import {
  Image,
  Row,
  Col,
  InputGroup,
  FormControl,
  ListGroup,
  Button,
  Collapse,
  Accordion,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import Buscar from "../assets/img/buscar.png";

const AutoCompleteText = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [titulos, setTitulos] = useState([]);
  const [isImage, setIsImage] = useState(true);
  const [filterValues, setFilterValues] = useState({});
  const [seccionFiltrosAbierta, setSecccionFiltroAbierta] = useState();

  useEffect(() => {
    async function fetchData() {
      const respuesta = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/api/oferta?fields=titulo`
      ); // Solo buscamos los titulos para autocompletar.
      const respuestaJson = await respuesta.json();
      console.log(respuestaJson);

      const titulos = respuestaJson.data.map((oferta) => oferta.titulo);

      setTitulos(titulos);
    }
    fetchData();
  }, []);

  const onTextChanged = (e) => {
    const items = titulos;
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
    }

    //this.setState(() => ({ suggestions, text: value }));
    setSuggestions(suggestions);
    setText(value);
  };

  const handleChange = (e) => {
    setFilterValues({ ...filterValues, [e.target.name]: e.target.value });
  };

  const suggestionSelected = (value) => {
    setSuggestions([]);
    setText(value);
    props.fetchOfertas({ titulo: value, ...filterValues });
  };
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ListGroup>
        {suggestions.map((item) => (
          <ListGroup.Item onClick={() => suggestionSelected(item)}>
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchOfertas({ titulo: text, ...filterValues });
  };

  return (
    <Accordion defaultActiveKey="0">
      <Row className="justify-content-center">
        <Col className="justify-content-center">
          <Row>
            <Collapse in={props.ofertasLength === 0 && !props.haBuscado}>
              <Image src={Buscar} fluid></Image>
            </Collapse>
          </Row>

          <Row className="mt-4 mx-1">
            <h5 id="titulo">Encuentra ofertas de trabajo</h5>
            <InputGroup className="mb-3 ">
              <FormControl
                value={text}
                onChange={onTextChanged}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text"
                placeholder="Buscar Empleo"
              />
              <InputGroup.Append>
                <Button onClick={handleSubmit} variant="secondary">
                  {props.cargando && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {props.cargando ? " Buscando" : "  Buscar  "}
                </Button>
              </InputGroup.Append>
              <InputGroup.Append>
                <Button
                  variant="info"
                  onClick={() =>
                    setSecccionFiltroAbierta(!seccionFiltrosAbierta)
                  }
                >
                  {!seccionFiltrosAbierta ? "Filtros" : "Cerrar"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <ListGroup horizontal>
              {Object.entries(filterValues).map((filter) => {
                if (filter[1]) {
                  return (
                    <ListGroup.Item style={{ "border-style": "none" }}>
                      <span
                        style={{ color: "red", "font-weight": "bold" }}
                        onClick={() => {
                          setFilterValues({
                            ...filterValues,
                            [filter[0]]: undefined,
                          });
                        }}
                      >
                        X
                      </span>{" "}
                      {filter[0] === "salarioDesde"
                        ? "Desde " + filter[1] + "€"
                        : filter[1]}
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Row>
          <Row>
            <Col>{renderSuggestions()}</Col>
          </Row>
          <Collapse in={seccionFiltrosAbierta}>
            <Row className="mt-4 mx-1">
              <InputGroup as={Col} md={3}>
                <Form.Group>
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    as="select"
                    name="provincia"
                    onChange={handleChange}
                    value={filterValues.provincia}
                  >
                    <option>A Coruña</option>
                    <option>Albacete</option>
                    <option>Álava</option>
                    <option>Alicante</option>
                    <option>Almería</option>
                    <option>Asturias</option>
                    <option>Ávila</option>
                    <option>Badajoz</option>
                    <option>Baleares</option>
                    <option>Barcelona</option>
                    <option>Burgos</option>
                    <option>Cáceres</option>
                    <option>Cádiz</option>
                    <option>Cantabria</option>
                    <option>Castellón</option>
                    <option>Ciudad Real</option>
                    <option>Córdoba</option>
                    <option>Cuenca</option>
                    <option>Girona</option>
                    <option>Granada</option>
                    <option>Guadalajara</option>
                    <option>Gipuzkoa</option>
                    <option>Huelva</option>
                    <option>Huesca</option>
                    <option>Jaén</option>
                    <option>La Rioja</option>
                    <option>Las Palmas</option>
                    <option>León</option>
                    <option>Lérida</option>
                    <option>Lugo</option>
                    <option>Madrid</option>
                    <option>Málaga</option>
                    <option>Murcia</option>
                    <option>Navarra</option>
                    <option>Ourense</option>
                    <option>Palencia</option>
                    <option>Pontevedra</option>
                    <option>Salamanca</option>
                    <option>Segovia</option>
                    <option>Sevilla</option>
                    <option>Soria</option>
                    <option>Tarragona</option>
                    <option>Santa Cruz de Tenerife</option>
                    <option>Teruel</option>
                    <option>Toledo</option>
                    <option>Valencia</option>
                    <option>Valladolid</option>
                    <option>Vizcaya</option>
                    <option>Zamora</option>
                    <option>Zaragoza</option>
                  </Form.Control>
                </Form.Group>
              </InputGroup>
              <InputGroup as={Col} md={3}>
                <Form.Group>
                  <Form.Label>Sector</Form.Label>
                  <Form.Control
                    name="sector"
                    onChange={handleChange}
                    as="select"
                    value={filterValues.sector}
                  >
                    <option>Administrador</option>
                    <option>Administrativo</option>
                    <option>Analista</option>
                    <option>Analista Programador</option>
                    <option>Arquitecto TIC</option>
                    <option>Auditor</option>
                    <option>Big Data</option>
                    <option>Ciberseguridad</option>
                    <option>Comercial</option>
                    <option>Consultor</option>
                    <option>Desarrollador Móvil</option>
                    <option>Desarrollador Web</option>
                    <option>DevOps</option>
                    <option>Diseño</option>
                    <option>Electrónica</option>
                    <option>Formador</option>
                    <option>Helpdesk</option>
                    <option>I+D</option>
                    <option>Jefe de Equipo</option>
                    <option>Jefe de Proyecto</option>
                    <option>Marketing</option>
                    <option>Migración de Datos</option>
                    <option>Operador</option>
                    <option>Programador</option>
                    <option>Reclutador</option>
                    <option>Redes</option>
                    <option>Responsable de Producto</option>
                    <option>SEO/Posicionamiento Web</option>
                    <option>Sistemas de Calidad</option>
                    <option>Soporte Técnico</option>
                    <option>Tester</option>
                    <option>Técnico de Bases de Datos</option>
                    <option>Técnico de Gestión</option>
                    <option>Técnico de Mantenimiento</option>
                    <option>Técnico de Sistemas</option>
                    <option>Técnico Hardware</option>
                    <option>Técnico Software</option>
                  </Form.Control>
                </Form.Group>
              </InputGroup>
              <InputGroup as={Col} md={4}>
                <Form.Group>
                  <Form.Label>Salario mínimo</Form.Label>
                  <Form.Control
                    name="salarioDesde"
                    onChange={handleChange}
                    as="select"
                    value={filterValues.salarioDesde}
                  >
                    <option>3000</option>
                    <option>4000</option>
                    <option>5000</option>
                    <option>6000</option>
                    <option>7000</option>
                    <option>8000</option>
                    <option>9000</option>
                    <option>10000</option>
                    <option>11000</option>
                    <option>12000</option>
                    <option>13000</option>
                    <option>14000</option>
                    <option>15000</option>
                    <option>16000</option>
                    <option>17000</option>
                    <option>18000</option>
                    <option>19000</option>
                    <option>20000</option>
                    <option>21000</option>
                    <option>22000</option>
                    <option>23000</option>
                    <option>24000</option>
                    <option>25000</option>
                    <option>26000</option>
                    <option>27000</option>
                    <option>28000</option>
                    <option>29000</option>
                    <option>30000</option>
                  </Form.Control>
                </Form.Group>
              </InputGroup>
              {/* 
              <InputGroup as={Col} md={3}>
                <Form.Group>
                  <Form.Label>Empresa</Form.Label>
                  <FormControl
                    placeholder="Empresa"
                    value={filterValues.empresa}
                    name="empresa"
                    onChange={handleChange}
                    aria-describedby="basic-addon3"
                  />
                </Form.Group>
              </InputGroup> */}
            </Row>
          </Collapse>
        </Col>
      </Row>
    </Accordion>
  );
};

export default AutoCompleteText;
