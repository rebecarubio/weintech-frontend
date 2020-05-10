import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  InputGroup,
  Col,
  Button,
  Card,
  Spinner,
  Row,
} from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "./../context/auth-context";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  nombre: yup.string().required(),
  primerapellido: yup.string().required(),
  segundoapellido: yup.string(),
  email: yup.string().email().required(),
  direccion: yup.string(),
  provincia: yup.string(),
  telefono: yup.string(),
  profesion: yup.string(),
});

const PerfilCandidato = () => {
  const [valor, setValor] = useState();
  const { candidatoId } = useParams();
  const history = useHistory();
  const [file, setFile] = useState({});
  const [cv, setCv] = useState({});
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedValues, setValues] = useState({});

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log(values);
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("primerapellido", values.primerapellido);
    formData.append("segundoapellido", values.segundoapellido);
    formData.append("email", values.email);
    formData.append("direccion", values.direccion);
    formData.append("provincia", values.provincia);
    formData.append("telefono", values.telefono);
    formData.append("profesion", values.profesion);

    if (file.length > 0) formData.append("image", file[0]);
    if (cv.length > 0) formData.append("curriculum", cv[0]);

    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/candidato/${candidatoId}/`,
      {
        mode: "cors",
        method: "PATCH",
        body: formData,
        credentials: "include",
      }
    );
    const responseJson = await res.json();

    if (responseJson.data) {
      auth.login(responseJson.data);
    }

    history.push("/candidato/" + candidatoId);
  };

  async function fetchData() {
    const response = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/candidato/${candidatoId}/`,
      { mode: "cors" }
    );
    const responseJson = await response.json();

    const valores = {
      nombre: "",
      primerapellido: "",
      segundoapellido: "",
      email: "",
      direccion: "",
      provincia: "",
      profesion: "",
      telefono: "",
      ...responseJson,
    };
    console.log(valores);
    setValues(valores, setIsLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!isLoading && (
        <Row className=" justify-content-center ">
          <Col md={6}>
            <Card className="p-4 mt-4 justify-content-center ">
              <Formik
                className="mt-4"
                enableReinitialize
                validationSchema={schema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
                initialValues={fetchedValues}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(values);
                    }}
                  >
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Introduzca sus datos</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          placeholder="Nombre"
                          value={values.nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.nombre && !errors.nombre}
                          isInvalid={touched.nombre && errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nombre}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Control
                          type="text"
                          name="primerapellido"
                          placeholder="Primer apellido"
                          value={values.primerapellido}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            touched.primerapellido && !errors.primerapellido
                          }
                          isInvalid={
                            touched.primerapellido && errors.primerapellido
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.primerapellido}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Control
                          type="text"
                          name="segundoapellido"
                          placeholder="Segundo apellido"
                          value={values.segundoapellido}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            touched.segundoapellido && !errors.segundoapellido
                          }
                          isInvalid={
                            touched.segundoapellido && errors.segundoapellido
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.segundoapellido}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Introduzca su email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          placeholder="Dirección"
                          value={values.direccion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.direccion && !errors.direccion}
                          isInvalid={touched.direccion && errors.direccion}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.direccion}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control
                          as="select"
                          type="text"
                          name="provincia"
                          placeholder="Provincia"
                          value={values.provincia}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.provincia && !errors.provincia}
                          isInvalid={touched.provincia && errors.provincia}
                        >
                          <option></option>
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
                        <Form.Control.Feedback type="invalid">
                          {errors.provincia}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          placeholder="Teléfono"
                          value={values.telefono}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.telefono && !errors.telefono}
                          isInvalid={touched.telefono && errors.telefono}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.telefono}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Profesion</Form.Label>
                        <Form.Control
                          type="text"
                          name="profesion"
                          placeholder="Profesion"
                          value={values.profesion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.profesion && !errors.profesion}
                          isInvalid={touched.profesion && errors.profesion}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.profesion}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Añade tu foto</Form.Label>
                        <Form.File
                          id="fotoSubir"
                          label="Foto de perfil..."
                          custom
                          onChange={(event) => {
                            setFile(event.currentTarget.files);
                          }}
                        />
                      </Form.Group>
                    </Form.Row>
                    <p style={{ color: "green" }}>
                      {file.length > 0 && file[0].name}
                    </p>

                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Añade tu currículum</Form.Label>
                        <Form.File
                          id="cvSubir"
                          label="Sube tu cv..."
                          custom
                          onChange={(event) => {
                            setCv(event.currentTarget.files);
                          }}
                        />
                      </Form.Group>
                    </Form.Row>
                    <p style={{ color: "green" }}>
                      {cv.length > 0 && cv[0].name}
                    </p>

                    <Button className="mr-5 mt-4" type="submit">
                      Actualizar datos
                    </Button>
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={() => window.history.back()}
                    >
                      Volver a mis ofertas
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PerfilCandidato;
