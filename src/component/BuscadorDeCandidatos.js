import React, { useState, useEffect } from "react";
import buildUrl from "build-url";
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
  Jumbotron,
} from "react-bootstrap";
import MostrarCandidatos from "./MostrarCandidatos";

const BuscadorDeCandidatos = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [profesiones, setProfesiones] = useState([]);
  const [isImage, setIsImage] = useState(true);
  const [filterValues, setFilterValues] = useState({});
  const [seccionFiltrosAbierta, setSecccionFiltroAbierta] = useState();
  const [cargando, setCargando] = useState(false);
  const [haBuscado, setHaBuscado] = useState(false);
  const [candidatos, setCandidatos] = useState([]);

  const fetchCandidatos = async (opciones) => {
    setHaBuscado(true);
    setCargando(true);
    const { profesion, provincia } = opciones;
    console.log("toy aki");

    const url = buildUrl(
      `${process.env.REACT_APP_API_ADDRESS}/api/candidato/buscar`,
      {
        queryParams: opciones,
      }
    );

    console.log(url);

    const respuesta = await fetch(url);

    const respuestaJson = await respuesta.json();
    setCandidatos(respuestaJson.data);
    setCargando(false);
  };

  useEffect(() => {
    async function fetchData() {
      const respuesta = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/api/candidato?fields=profesion`
      );
      const respuestaJson = await respuesta.json();
      console.log(respuestaJson);

      const profesiones = respuestaJson.data.map(
        (candidato) => candidato.profesion
      );

      setProfesiones(profesiones);
    }
    fetchData();
  }, []);

  const onTextChanged = (e) => {
    const items = profesiones;
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
    fetchCandidatos({ profesion: value, ...filterValues });
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
    fetchCandidatos({ profesion: text, ...filterValues });
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Row className="justify-content-center">
          <Col
            className="justify-content-center m-4"
            style={{ backgroundColor: " rgba(0, 0, 0.2, 0.2)" }}
          >
            <Row className="mt-4 mx-1">
              <h5 id="titulo">Encuentra candidat@s</h5>
              <InputGroup className="mb-3" id="Buscador">
                <FormControl
                  value={text}
                  onChange={onTextChanged}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  type="text"
                  placeholder="Busca por profesión"
                />
                <InputGroup.Append>
                  <Button onClick={handleSubmit} variant="secondary">
                    {cargando && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {cargando ? " Buscando" : "  Buscar  "}
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
              </Row>
            </Collapse>
          </Col>
        </Row>
      </Accordion>

      {candidatos.length > 0 && <MostrarCandidatos candidatos={candidatos} />}
      {haBuscado && candidatos.length === 0 && (
        <Card
          md={12}
          fluid
          className="mt-2 text-center"
          bg="light"
          border="info"
        >
          <Card.Title className="m-2 text-muted">
            No existen candidat@s con estos criterios
          </Card.Title>
          <Card.Text className="m-2 text-muted">
            Intenta ampliar tu búsqueda{" "}
          </Card.Text>
        </Card>
      )}
    </>
  );
};

export default BuscadorDeCandidatos;
