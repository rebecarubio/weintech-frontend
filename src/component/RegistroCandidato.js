import React, { Component, useState, Link, useContext } from "react";
import Notificacion from "./util/Notificacion";
import { AuthContext } from "../context/auth-context";
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
  primerapellido: yup.string().required(),
  segundoapellido: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const RegistroCandidato = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [empresa, setEmpresa] = useState({
    nombre: "",
    primerapellido: "",
    segundoapellido: "",
    email: "",
    password: "",
  });

  const [showNotificacion, setShowNotificacion] = useState(false);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("primerapellido", values.primerapellido);
    formData.append("segundoapellido", values.segundoapellido);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const respuesta = await fetch(
      `${process.env.REACT_APP_API_ADDRESS}/api/signup`,
      {
        mode: "cors",
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    const respuestaJson = await respuesta.json();

    if (respuestaJson.status === "success") {
      console.log(respuestaJson);
      auth.login(respuestaJson.data);
      history.push("/");
    } else {
      //notificacion
      setShowNotificacion({
        mensaje: respuestaJson.mensaje,
        variant: "danger",
      });
      setTimeout(() => setShowNotificacion(false), 2000);
      console.log(respuestaJson.mensaje);
    }
  };

  return (
    <>
      <Row className=" justify-content-center ">
        <Col md={6}>
          <Card fluid className="p-4 mt-4 justify-content-center ">
            <Card.Title>Registrate como candidat@</Card.Title>
            <Row>
              <Col>
                <Formik
                  className="mt-4"
                  enableReinitialize
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                  initialValues={{
                    nombre: "",
                    primerapellido: "",
                    segundoapellido: "",
                    email: "",
                    password: "",
                  }}
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
                          <Form.Label>Nombre</Form.Label>
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
                          <Form.Label>Primer Apellido</Form.Label>
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
                          <Form.Label>Segundo Apellido</Form.Label>
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
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Group>
                        {" "}
                        Al hacer clic en «Aceptar y unirte», aceptas las
                        Condiciones de uso, la Política de privacidad y la
                        Política de cookies de WeInTech.
                      </Form.Group>
                      <Form.Row className="justify-content-center">
                        <Notificacion
                          show={showNotificacion}
                          variant={showNotificacion.variant}
                          mensaje={showNotificacion.mensaje}
                        />
                      </Form.Row>
                      <Button className="mr-5 mt-4" type="submit">
                        Aceptar y unirse
                      </Button>
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={() => history.push("/")}
                      >
                        Volver
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RegistroCandidato;
