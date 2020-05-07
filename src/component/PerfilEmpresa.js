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

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  nombre: yup.string().required(),
  web: yup.string().url(),
  sector: yup.string().required(),
  email: yup.string().email().required(),
  CIF: yup.string().matches(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/),
  direccion: yup.string(),
  provincia: yup.string().required(),
  telefono: yup.string().required(),
  descripcion: yup.string(),
});

const PerfilEmpresa = () => {
  const [valor, setValor] = useState();
  const { empresaId } = useParams();
  const history = useHistory();
  const [file, setFile] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [fetchedValues, setValues] = useState({});

  const handleSubmit = async (values) => {
    console.log("toy aki");
    setIsLoading(true);
    console.log(values);
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("web", values.web);
    formData.append("sector", values.sector);
    formData.append("email", values.email);
    formData.append("CIF", values.CIF);
    formData.append("direccion", values.direccion);
    formData.append("provincia", values.provincia);
    formData.append("telefono", values.telefono);
    formData.append("descripcion", values.descripcion);

    if (file.length > 0) formData.append("image", file[0]);

    const res = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/empresa/${empresaId}/`,
      {
        //mode: "cors",
        method: "PATCH",
        body: formData,
        credentials: "include",
      }
    );
    const responseJson = await res.json();

    if (responseJson.data) {
      history.push(`/helpreq/${responseJson.data.data._id}`);
    }

    history.push("/");
  };

  async function fetchData() {
    const response = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/empresa/${empresaId}/`,
      { mode: "cors" }
    );

    setValues(await response.json(), setIsLoading(false));
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
                        <Form.Label>Nombre Empresa</Form.Label>
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
                        <Form.Label>Sector</Form.Label>
                        <Form.Control
                          type="text"
                          name="sector"
                          placeholder="Sector"
                          value={values.sector}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.sector && !errors.sector}
                          isInvalid={touched.sector && errors.sector}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.sector}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Web</Form.Label>
                        <Form.Control
                          type="text"
                          name="web"
                          placeholder="Web"
                          value={values.web}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.web && !errors.web}
                          isInvalid={touched.web && errors.web}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.web}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>CIF</Form.Label>
                        <Form.Control
                          type="text"
                          name="CIF"
                          placeholder="CIF apellido"
                          value={values.CIF}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.CIF && !errors.CIF}
                          isInvalid={touched.CIF && errors.CIF}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.CIF}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Email</Form.Label>
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
                        <Form.Label>Dirección</Form.Label>
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
                          type="text"
                          name="provincia"
                          placeholder="Provincia"
                          value={values.provincia}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.provincia && !errors.provincia}
                          isInvalid={touched.provincia && errors.provincia}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.provincia}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="validationFormikName">
                        <Form.Label>Teléfono</Form.Label>
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
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          type="text"
                          name="descripcion"
                          placeholder="Descripción"
                          value={values.descripcion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.descripcion && !errors.descripcion}
                          isInvalid={touched.descripcion && errors.descripcion}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.descripcion}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Añade tu logo</Form.Label>
                        <Form.File
                          id="fotoSubir"
                          label="Logo de empresa..."
                          custom
                          onChange={(event) => {
                            setFile(event.currentTarget.files);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.foto}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Button className="mr-5 mt-4" type="submit">
                      Actualizar datos
                    </Button>
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={() => history.push("/empresa/" + empresaId)}
                    >
                      Volver
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

export default PerfilEmpresa;
